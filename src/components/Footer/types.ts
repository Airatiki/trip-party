export interface IProps {
    history: {
        location: {
            pathname: string;
        };
        push(path: string): void;
    }
}
