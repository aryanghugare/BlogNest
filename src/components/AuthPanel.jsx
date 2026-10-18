import { Link } from 'react-router-dom'
import Icon from './Icon'
export default function AuthPanel({ children, signup = false }) {
  return <div className="auth-page"><div className="auth-layout"><aside className="auth-aside"><div className="auth-aside-top"><span>THE BLOGNEST JOURNAL</span><span>READ / WRITE</span></div><img src="/writers-desk.jpg" alt="A fountain pen and a page of handwritten notes" /><div className="auth-aside-copy"><h2>{signup ? <>Everybody has<br />a story somewhere.</> : <>There’s a lot<br />left to write.</>}</h2><p>{signup ? 'Start with something you know. The rest can follow.' : 'Your notebook is right where you left it.'}</p></div></aside><div className="auth-form-panel"><Link to="/" className="back-link"><Icon name="back" size={16} /> Back to the journal</Link>{children}<p className="auth-bottom-note">BlogNest / A place for your stories</p></div></div></div>
}
