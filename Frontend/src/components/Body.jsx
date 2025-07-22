import {Outlet} from 'react-router'

const Body = ()=>
    {
        return (<div>
            <h1>Body</h1>
            <Outlet/>
        </div>)
    }

export default Body;