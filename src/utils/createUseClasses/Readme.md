#example usage:

    interface Props {
        size: number;
    }

    export const App = (props: Props) => {
        const classes = useClasses(props);

        return (
            <div className={classes.mainAppContainer}>
                <div className={classes.innerComponent}>
                    im the inner component
                </div>
                Hello Datree
            </div>
        );
    };

    const useClasses = createUseClasses<Props>((props) => ({
        mainAppContainer: css`
            border: ${props.size}px solid green;
            background-color: green;
        `,
        innerComponent: css`
            background-color: red;
            opacity: 30%;
        `,
    }));

##note: you can replace the theme provider inside createUseClasses "useTheme" hook
