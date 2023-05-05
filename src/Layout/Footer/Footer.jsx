import css from './Footer.module.css';

const Footer = () => {
  return (
    <div className={css.footerContainer}>
      <div className="card">
        <div className="card-header">But the way...</div>
        <div className="card-body">
          <h5 className="card-title">Moscow will be destroyed anyway</h5>
          <div className={css.linkContainer}>
            <p className="card-text">Do you want to know more?</p>
            <a
              className="btn btn-outline-primary"
              href="https://minusrus.com/"
              target="_blank"
              rel="noopener noreferrer nofollow"
            >
              RuSSia's losses
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
