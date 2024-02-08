import CSS from 'csstype'

interface IExampleProps {
    id: string;
    time: number;
    startingColour: string;
    flipColour: string;
}

const Example: React.FC<IExampleProps> = ({ id, time, startingColour, flipColour }) => {

    const backStyle: CSS.Properties = {
        width: "20px",
        height: "20px",
        background: startingColour,
        border: "1px solid transparent",
        borderRadius: "11%",
        padding: "0",
        marginRight: "5px",
        perspective: "300px",
        transition: "transform 0.75s",
        transformStyle: "preserve-3d",
    }

    const frontStyle: CSS.Properties = {
        width: "20px",
        height: "20px",
        background: flipColour,
        position: "absolute",
        top: "-1px",
        right: "-1px",
        border: "1px solid transparent",
        borderRadius: "11%",
        backfaceVisibility: "hidden",
        transform: "rotateY(180deg)"

    }

    setTimeout(() => {
        document.getElementById(id)?.classList.toggle("flip");
        console.log("ran");
    }, time)

    return (
        <div id={id} style={backStyle}>
            <div style={frontStyle}></div>
        </div>
    )
}

export default Example;

