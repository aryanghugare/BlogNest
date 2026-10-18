import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Container from '../components/container/Container'
import Icon from '../components/Icon'
import StoryCollection from '../components/StoryCollection'

export default function Home() {
  const status = useSelector((state) => state.auth.status)
  const writePath = status ? '/add-post' : '/signup'
  return <Container>
    <section className="journal-hero" aria-labelledby="hero-title">
      <div className="hero-copy">
        <p className="eyebrow journal-kicker">THE BLOGNEST JOURNAL</p>
        <h1 id="hero-title">Life, in our<br /><em>own words.</em></h1>
        <p className="hero-description">A place to write about what you know, what you’re learning, and whatever happened on the way.</p>
        <div className="hero-actions">
          <Link className="button button-primary" to={status ? '/all-posts' : '/login'}>Read the journal <Icon name="arrow" size={17} /></Link>
          <Link className="underlined-link" to={writePath}>or, write something</Link>
        </div>
        <p className="hero-margin-note">Personal stories. Shared here.</p>
      </div>
      <figure className="journal-photo">
        <div className="journal-photo-crop"><img src="/writers-desk.jpg" alt="A fountain pen leaving handwritten notes on a page" fetchPriority="high" /></div>
        <figcaption><span>01 / THE WRITING DESK</span><span>There’s always another page.</span></figcaption>
      </figure>
    </section>

    <section className="stories-section" id="stories">
      <div className="section-heading"><div className="section-title"><span className="section-number">01</span><h2>Latest entries</h2></div>{status ? <Link className="text-link" to="/all-posts">All stories <Icon name="arrow" size={16} /></Link> : <span className="section-aside">FROM THE COMMUNITY</span>}</div>
      {status ? <StoryCollection compact /> : <div className="journal-welcome">
        <div className="welcome-heading"><span className="small-label">READERS & WRITERS WELCOME</span><h3>A shared<br /><em>notebook.</em></h3></div>
        <div className="welcome-detail"><p>This is where published stories live. Log in to see what people are writing, or add a page of your own.</p><div><Link className="text-link" to="/login">Log in to read <Icon name="arrow" size={17} /></Link><Link className="underlined-link" to="/signup">Create an account</Link></div></div>
        <span className="welcome-asterisk" aria-hidden="true">✳</span>
      </div>}
    </section>

    <section className="about-journal" id="about" aria-labelledby="about-title">
      <div className="about-copy"><p className="eyebrow">02 / ABOUT THIS SPACE</p><h2 id="about-title">A notebook with<br />room for more.</h2><p>Some posts begin with a plan. Others begin with a sentence you don’t want to forget. There’s room for both here.</p><p>Write an essay. Keep a record of what you’re learning. Tell the story you always end up telling your friends.</p><Link className="text-link" to={writePath}>Write your first line <Icon name="diagonal" size={16} /></Link></div>
      <aside className="writing-prompts" aria-label="Writing prompts"><span className="small-label">STUCK ON THE FIRST SENTENCE?</span><h3>A few places to begin.</h3><ol><li><span>01</span><p>Something you learned<br /><em>the hard way.</em></p></li><li><span>02</span><p>A place you keep<br /><em>coming back to.</em></p></li><li><span>03</span><p>An idea you haven’t<br /><em>quite figured out.</em></p></li></ol><p className="prompts-footnote">Take one of these. See where it goes.</p></aside>
    </section>
  </Container>
}
