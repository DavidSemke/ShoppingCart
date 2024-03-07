import '../styles/Banner.css'


function Banner(props) {
    return (
        <div id={props.id} className="banner">
            <p>{props.text}</p>
        </div>
    )
}


export default Banner