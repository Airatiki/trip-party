import { IProps } from './types';
import { IReduxState } from 'api/types';

import React, {Component} from 'react';
import { connect } from 'react-redux';
import { compose, Dispatch } from 'redux';
import { withRouter } from 'react-router';

import * as actions from 'api/guides/actions';
import * as profileActions from 'api/profile/actions';
import {
    Cell,
    FormLayout, FormLayoutGroup, Group,
    HeaderButton,
    IS_PLATFORM_ANDROID, IS_PLATFORM_IOS, List,
    ModalPage,
    ModalPageHeader,
    ModalRoot, Panel, PanelHeader,
    platform,
    ScreenSpinner, Search, Slider,
    View,
    Div
} from "@vkontakte/vkui";
import {OS} from "@vkontakte/vkui/dist/lib/platform";
import GuideDemo from "./GuideDemo";

import Icon24Cancel from '@vkontakte/icons/dist/24/cancel';
import Icon24Done from '@vkontakte/icons/dist/24/done';
import Icon24BrowserBack from '@vkontakte/icons/dist/24/browser_back';
import Icon24Sort from '@vkontakte/icons/dist/24/sort';
import Icon28AddOutline from '@vkontakte/icons/dist/28/add_outline';

import { TAGS } from "../../api/guides/constants";
import Tags from "../CreateGuide/Tags";
import Footer from "components/Footer";


const MODAL_PAGE_FILTERS = 'filters';

interface IFilterState {
    activeModal: any,
    modalHistory: any,
    search: '',
    searchList: [],
    budget: number,
    tags: TAGS[];
}

class Travels extends Component<IProps, IFilterState> {
    public theme = 'light';
    public users: any;
    public modalBack: any;

    constructor(props: IProps) {
        super(props);

        this.theme = platform() === OS.IOS ? 'header' : 'light';

        this.state = {
            activeModal: null,
            modalHistory: [],
            budget: 1000,
            search: '',
            searchList: [],
            tags: [],
        };

        this.users = ['123', '123'];

        this.modalBack = () => {
            this.setActiveModal(this.state.modalHistory[this.state.modalHistory.length - 2]);
            this.callGet();
        };
    }

    public callGet = () => {
        this.props.get({
            city: this.state.search,
            tags: this.state.tags,
            budget: `${Math.round(this.state.budget)}`,
        }, this.props.profile.friends, this.props.profile.VkId);
    };

    public setActiveModal(activeModal: any) {
        activeModal = activeModal || null;
        let modalHistory = this.state.modalHistory ? [...this.state.modalHistory] : [];

        if (activeModal === null) {
            modalHistory = [];
        } else if (modalHistory.indexOf(activeModal) !== -1) {
            modalHistory = modalHistory.splice(0, modalHistory.indexOf(activeModal) + 1);
        } else {
            modalHistory.push(activeModal);
        }

        this.setState({
            activeModal,
            modalHistory
        });
    };

    public maps() {
        if (!this.state.search) {
            return;
        }

        const travelApi = `https://autocomplete.travelpayouts.com/places2?term=${this.state.search}&locale=ru`;

        fetch(travelApi)
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                this.setState({searchList: data})
            })
            .catch((e) => {
                console.log(e);
                this.setState({searchList: []})
            })
    }

    public componentDidMount(): void {
        this.props.get({}, this.props.profile.friends, this.props.profile.VkId);
    }

    public componentDidUpdate(): void {
        const {error} = this.props;
        error && console.log(error);
    }

    public render() {
        const modal = (
            <ModalRoot activeModal={this.state.activeModal}>
                <ModalPage
                    id={MODAL_PAGE_FILTERS}
                    onClose={this.modalBack}
                    header={
                        <ModalPageHeader
                            left={IS_PLATFORM_ANDROID
                            && <HeaderButton onClick={this.modalBack}><Icon24Cancel/></HeaderButton>}
                            right={<HeaderButton onClick={this.modalBack}>{IS_PLATFORM_IOS
                                ? 'Готово' : <Icon24Done />}</HeaderButton>}
                        >
                            Фильтры
                        </ModalPageHeader>
                    }
                >
                    <FormLayout>
                        <FormLayoutGroup top="Город">
                            <Search
                                value={this.state.search}
                                onChange={(e: any) => {
                                    this.setState({ search: e.replace(/\s+/g, ' ') });
                                    this.maps();
                                }}
                            />
                            {
                                !!this.state.searchList.length &&
                                <Group title={`Список мест по запросу "${this.state.search}"`}>
                                    <List>
                                        {
                                            this.state.searchList.map((list: any, index) => {
                                                    return (
                                                        <Cell
                                                            key={index}
                                                            multiline={true}
                                                            description={`${list.country_name}`}
                                                            onClick={(value) => {
                                                                this.setState({search: list.name, searchList: []})
                                                            }}
                                                        >
                                                            {`${list.name}`}
                                                        </Cell>
                                                    );
                                                }
                                            )
                                        }
                                    </List>
                                </Group>
                            }
                        </FormLayoutGroup>

                        <FormLayoutGroup top="Хэштеги">
                            <Tags
                                addedTags={this.state.tags}
                                onChange={(tags) => this.setState({tags: [...tags]})}
                            />
                        </FormLayoutGroup>

                        <FormLayoutGroup top="Бюджет" bottom={`${Math.round(this.state.budget)}P`}>
                            <Slider
                                min={1}
                                max={100000}
                                value={Number(this.state.budget)}
                                onChange={(value: any) => {
                                    console.log(value);
                                    this.setState({budget: value})
                                }}
                                defaultValue={this.state.budget}
                                top="Бюджет"

                            />
                        </FormLayoutGroup>
                    </FormLayout>
                </ModalPage>
            </ModalRoot>
        );

        if (!this.props.isLoaded) {
            return <ScreenSpinner size='large'/>
        }

        return(
            <div style={{marginTop: '-45px', marginBottom: '60px'}}>
                <PanelHeader
                    left={
                        <Div className='d-flex flex-row'>
                            <Icon24BrowserBack
                                className='mr-3'
                                onClick={this.props.history.goBack}
                            />
                            <Icon24Sort
                                className='mr-3'
                                onClick={() => this.setActiveModal(MODAL_PAGE_FILTERS)}
                            />
                            <Icon28AddOutline
                                style={{marginTop: '-2px'}}
                                onClick={
                                    () => this.props.history.push('/create_guide')
                                }
                            />
                        </Div>
                    }
                    children={
                        <div>Гайды</div>
                    }
                />
                <View activePanel="modals" modal={modal}>
                    <Panel id="modals">
                        <div>
                            {
                                this.props.guides.map((guide) =>
                                    <GuideDemo key={guide.id} guide={guide}/>
                                )
                            }
                        </div>
                    </Panel>
                </View>
                <div className='mt-4'>
                    <Footer/>
                </div>
            </div>
        );
    }
}

export default compose(
    connect(
        (state: IReduxState) => ({
            guides: actions.getState(state),
            profile: profileActions.getState(state),
            error: actions.getError(state),
            isLoaded: actions.isLoaded(state),
        }),
        (dispatch: Dispatch) => ({
            get: actions.get(dispatch),
        }),
    ),
)(withRouter(Travels));
