import PropTypes from 'prop-types'
import Button from './Button'
import { useLocation } from 'react-router-dom'


const Header = ({ title,onAdd,showAdd }) => {
// passing functions as props
const location = useLocation()

    return (
        <header className='header'>
            <h1> {title} </h1>
            {location.pathname === '/' && <Button 
            onClick={onAdd} 
            color={showAdd?'green':'red'} 
            text={showAdd ? 'New Task':'Close'}/>}
        </header>
)
}

//example of default props
//
Header.defaultProps = {
    title: 'Task Tracker'
}

// you can be more specific with your propr types and give them default types.

Header.propTypes = {
    //generate error in the dev console when the title is unavailable and diffrent data type.
    title: PropTypes.string.isRequired,
}

// example of inline styling e.g <h1 style = {headingStyle}> </h1> 
// const headingStyle = {
//     color: 'red',
//     backgroundColor: 'black',
// } 

export default Header
