import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import tinsJson from '../data/tins/14500547.json'
import { DateTime } from 'luxon'
import '../components/3.css'

export const ReportTemplate = ({
  versantlogo,
  pearsonlogo,
  partnerlogo
}) => {
  const report = tinsJson;
  return <React.Fragment>
    <header>
      <div className="row">
        <div className="column1">
          <div className="versant-logo">
            <img src={versantlogo} alt="Versant logo" />
          </div>
          <h2>English Placement Test</h2>
        </div>
        <div className="column2">
          <div className="brands">
            <img src={partnerlogo} alt="Co-brand logo" />
            <img src={pearsonlogo} alt="Pearson logo" />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="column1">
          <p className="label">Testee name:</p>
          <h3 className="testtaker-name">{ report.name }</h3>
        </div>
        <div className="column2">
          <div className="column-50">
            <p className="label">Completion Date</p>
            <p className="value">{ DateTime.fromMillis(report.endTime).toFormat('dd MMMM yyyy')}</p>
          </div>
          <div className="column-50">
            <p className="label">TIN</p>
            <p className="value">{ report.tin }</p>
          </div>
        </div>
      </div>
    </header>
    <main className="row">
      <div className="column1">
        <h3>Candidate's Capabilities</h3>
        <p className="overall-score-descriptor">{report.mainScore.description}</p>
        {report.scores.map((score,i) =>
        <React.Fragment key={i}>
        <h3 className="skill-scores">{score.label}:
          <span className="skill-score">{score.gse}</span>
          <span className="skill-max">/90</span>
          <div className="skill-other-scales">
            <span className="scale-name">Versant:</span>
            <span className="skill-score">{score.versant}</span>
            <span className="skill-max">/80</span>
            <span className="scale-name">CEFR:</span>
            <span className="skill-score">{score.cefr}</span>
          </div>
        </h3>
        <p className="skill-descriptor">{score.description}</p>
        </React.Fragment>
        )}
        <div className="other-skills">
          <h3>Additional Performance Information</h3>
          {report.minorScores.map((score,i) =>
          <div className="column-50" key={i}>
            <h4>{score.label}</h4>
            <p className="skill-descriptor">{score.definition}</p>
            <p className="skill-descriptor score">Level: {score.value}</p>
            <p className="skill-descriptor">{score.description}</p>
          </div>)}
        </div>
      </div>
      <div className="column2">
        <div className="main-score">
          <p className="gse-score">
            <span className="gse-score-number">{report.mainScore.gse}</span>
            <span>/90</span>
          </p>
          <p className="gse-label">
            <b>GSE</b>PRO<b>Score</b>
          </p>
        </div>
        <div className="other-scales">
          <h3>A GSEPRO Score of 53<br/> is equivalent to</h3>
          <h4>Versant: {report.mainScore.versant}</h4>
          <p>Versant Gia que simaxim olorro endia soles
dest, coria conecaborro eaquas conem aboratem et lab is ea nis eaquas ditem ipsam,
omnis pa eaquodi dessi repeditaspel isit</p>
          <h4>CEFR: {report.mainScore.cefr}</h4>
          <p>Corresponding level in the Common European Framework of Reference.
The Common European Framework divides
learners into three broad divisions that can
be divided into six levels.</p>
          <h4>IELTS: 5.5 - 6.0</h4>
          <p>The TOEIC Listening and Reading test is a
paper-and-pencil, multiple-choice assessment that elicits responses in two sections
(Listening and Reading).</p>
          <h4>TOEFL iBT: 57 - 86</h4>
          <p>The TOEIC Listening and Reading test is a
paper-and-pencil, multiple-choice assessment that elicits responses in two sections
(Listening and Reading).</p>
        </div>
      </div>
    </main>
    <div className="supplement-page">
      <div className="column1 tips">
        <h3>Tips to improve</h3>
      {report.scores.map((score,i) => 
        <div key={i}>
          <h4>{score.label}</h4>
          {score.tips.map((tip,j) => 
          <p key={j} className="skill-descriptor">- {tip}</p>
          )}
        </div>
      )}
      </div>
      <div className="column2 definitions">
        <h3>Understanding your skills:</h3>
        <h4>{report.mainScore.label}</h4>
        <p className="skill-descriptor">{report.mainScore.definition}</p>
        {report.scores.map((score,i) => 
          <React.Fragment key={i}>
            <h4>{score.label}</h4>
            <p className="skill-descriptor">{score.definition}</p>
          </React.Fragment>
        )}
      </div>
    </div>
  </React.Fragment>
}
    // <section className="section">
    //   <div className="container content">
    //     <div className="columns">
    //       <div className="column is-10 is-offset-1">
            
    //         <img src={versantlogo} />
    //         <img src={pearsonlogo} />
    //         <img src={partnerlogo} />
            
    //       </div>
    //     </div>
    //   </div>
    // </section>

export default ({ data }) => 
  <Layout>
    <ReportTemplate
      versantlogo={data.markdownRemark.frontmatter.versantlogo.publicURL}
      pearsonlogo={data.markdownRemark.frontmatter.pearsonlogo.publicURL}
      partnerlogo={data.markdownRemark.frontmatter.partnerlogo.publicURL}
    />
  </Layout>

export const pageQuery = graphql`
  query ReportByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        versantlogo {
          publicURL
        }
        pearsonlogo {
          publicURL
        }
        partnerlogo {
          publicURL
        }
      }
    }
  }
`
