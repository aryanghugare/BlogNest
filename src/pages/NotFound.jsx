import { Link } from 'react-router-dom'
import Container from '../components/container/Container'
import Icon from '../components/Icon'
export default function NotFound() { return <Container><div className="empty-state standalone-empty"><span className="eyebrow">ERROR / 404</span><h1>Page not found.</h1><p>This address doesn’t lead to a page. Try the journal instead.</p><Link className="button button-primary" to="/">Back to the journal <Icon name="arrow" size={17} /></Link></div></Container> }
