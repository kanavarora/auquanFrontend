import React, { Component, PropTypes } from 'react';
import config from '../../config';
import Helmet from 'react-helmet';
import Modal from 'react-modal';
import { Signup } from 'components';
import {connect} from 'react-redux';

@connect(
  state => ({user: state.auth.user}))
export default class Home extends Component {

  static propTypes = {
    user: PropTypes.object
  }

  constructor() {
    super();
    this.state = {
      modalIsOpen: false,
    };
  }

  handleSubmit = () => {
    this.setState({modalIsOpen: true});
  };

  handleViewTutorial = () => {

  };

  render() {
    const {user} = this.props;
    const styles = require('./Home.scss');
    // require the logo image both from client and server
    const logoImage = require('./auquan_highres_logo_full_small.png');

    const customStyles = {
      content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
      }
    };

    const renderSignupModal = () => {
      const shouldClose = true;
      const isSignupModal = true;
      const closeModal = () => {
        this.setState({modalIsOpen: false});
      };
      return (
      <Modal
        isOpen={this.state.modalIsOpen}
        contentLabel="Signup"
        style={customStyles}
        onRequestClose={this.closeModal}
        shouldCloseOnOverlayClick={shouldClose}>
        <Signup
          isModal={isSignupModal}
          closeModalPressed={closeModal}
          utmSource={this.props.location.query.utm_source}
        />
      </Modal>
      );
    };

    const renderHeading = function(title) {
      return (<h2>{title}</h2>);
    };

    const renderPara = function(line) {
      if (typeof line === 'function') {
        return (<p>{line()}</p>);
      }
      return (<p><span>{line}</span></p>);
    };

    const renderBulletPoints = function(lines) {
      return (<ul>
                {lines.map((line) => {
                  if (typeof line === 'function') {
                    return (<li>{line()}</li>);
                  }
                  return (<li><span>{line}</span></li>);
                })
                }
              </ul>);
    };

    const renderOrderedList = function(points) {
      return (<ol>
                {points.map((point) => {
                  return (<li><b>{point[0]}</b> {point[1]}</li>);
                })}
              </ol>);
    };

    return (
      <div className={styles.home}>
        <Helmet title="Home"/>
        {renderSignupModal()}
        <div className={styles.masthead}>
          <div className="container">
            <div className={styles.logo}>
              <p>
                <img src={logoImage}/>
              </p>
            </div>
            <h1>{config.app.title}</h1>

            <h2>{config.app.description}</h2>
            {!user && <button onClick={this.handleSubmit} className={styles.signupButton}>Sign up</button>}
            {user && <a href="http://www.auquan.com/trading-blog" target="_blank">View Tutorial</a>}
            <p className={styles.humility}>
              Created and maintained by Auquan.
            </p>
          </div>
        </div>

        <div className="container">
          <div className={styles.section}>
            {renderHeading('What to do?')}
            {renderPara('Write a trading algorithm using any logic you like. Backtest and submit any number of your trading strategies.')}
            {renderPara('We will run your code against test/live data to evaluate your performance')}
          </div>
          <div className={styles.section}>
            {renderHeading('What can I win?')}
            {renderBulletPoints([()=>{
              return (<span>Cash prizes for the strategies that top the leaderboard. <b>We will update the actual prize money shortly!
</b></span>);
            },
            'Showcase your talent to top quantitative firms',
            'Interview with top quantitative firms based on your performance in the competition'
            ])}
          </div>
          <div className={styles.section}>
            {renderHeading('How will I win?')}
            {renderPara('Broadly, we are looking for stable returns with low risk and low correlation with the benchmark index. We will rate you on the following criteria:')}
            {renderOrderedList([['Alpha:', 'Measure of how your algorithm performs against the benchmark. Higher the alpha, the better a strategy is.'],
                                ['Beta:', 'Correlation of your algorithm’s performance with the benchmark. Lower the beta (the strategy is immune to swings in the market), the better a strategy is.'],
                                ['Sharpe Ratio:', 'Returns/Risk, measure of risk adjusted returns. Higher Sharpe is better.'],
                                ['Annualized volatility:', 'Lower volatility is better.'],
                                ['Max Drawdown:', 'The greatest loss suffered from a peak in returns to its subsequent low. Lower values are better.']])}
            {renderPara(()=>{return (<span>If you want a detailed explanation of what these parameters are, follow our <a href="aquan.com/tutorial">tutorial series</a>!</span>);})}
            {renderPara('The exact judging metric will be updated shortly, stay tuned!')}
            {renderPara('The leaderboard is updated when you make a submission. If you submit several trading algorithms, we will take the one with the highest score. We will announce the winners at the end of the competition.')}
          </div>
          <div className={styles.section}>
            {renderHeading('Where is the toolbox?')}
            {renderPara('The details of the toolbox, how to use and sample code snippets will be available shortly.')}
          </div>
          <div className={styles.section}>
            {renderHeading('What can I trade?')}
            {renderPara('We will make a list of datasets available shortly. Your algorithm must trade any of the products which are available in the dataset ONLY.')}
          </div>
          <div className={styles.section}>
            {renderHeading('How far back does the data go?')}
            {renderPara('We will make the range of datasets available shortly.')}
          </div>
          <div className={styles.section}>
            {renderHeading('Anything else?')}
            {renderPara('A few other considerations:')}
            {renderBulletPoints(['Your algorithm must evaluate in less than 10 minutes',
                                 'Your algorithm must return the same result if it is run twice (deterministic)',
                                 'Your algorithm should not use ex post common knowledge (e.g. ‘don’t trade in 2008’)',
                                 'Your algorithm must complete a full backtest for the entire range of data available',
                                 'Your algorithm must not violate or infringe on any applicable law or regulation or third-party rights. Any violation would mean immediate disqualification.'])}
          </div>
        </div>
      </div>
    );
  }
}
