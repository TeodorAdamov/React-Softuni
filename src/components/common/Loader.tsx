import BeatLoader from "react-spinners/BeatLoader"

type LoaderPropsType = {
    loading: boolean,
    color: string,
    override: {}
}

const Loader = ({ loading, color, override }: LoaderPropsType) => {
    return (
        <div className="sweet-loading">
            <BeatLoader
                color={color}
                loading={loading}
                cssOverride={override}
                size={100}
                aria-label="Loading Spinner"
                data-testid="loader"
            />
        </div>
    );
}

export default Loader
