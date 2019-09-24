import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import tinsJson from '../data/tins/14500547.json'
import { DateTime } from 'luxon'
import '../components/3.css'

const cefrRanges = [{
  minValue: 10,
  maxValue: 21.5,
  label: '<A1'
}, {
  minValue: 21.5,
  maxValue: 30,
  label: 'A1'
},{
  minValue: 30,
  maxValue: 42,
  label: 'A2'
},{
  minValue: 42,
  maxValue: 58.5,
  label: 'B1'
},{
  minValue: 58.5,
  maxValue: 75.5,
  label: 'B2'
},{
  minValue: 75.5,
  maxValue: 84.5,
  label: 'C1'
}, {
  minValue: 84.5,
  maxValue: 90,
  label: 'C2'
}]

const dataset = (score, i) => <React.Fragment key={i}>
  <rect
    x={i*130+200}
    y={420 - (score.gse) * 4}
    width="115"
    height={(score.gse) * 4}
    style={{fill: "url(#grad)"}}
    >
  </rect>
  <rect
    x={i*130+200}
    y={100}
    width="115"
    height={320}
    style={{fill: "rgba(234, 238, 241, 0.3)"}}
    >
  </rect>
  <text
    x={i*130+257.5}
    y={440 - (score.gse) * 4}
    style={{
    fill: "#fff",
    fontSize: "12px",
    "text-anchor":"middle"
    }}
  >
    {score.gse}
  </text>
  <text
    x={i*130+257.5}
    width={115}
    y={450}
    style={{
    fill: "#000",
    fontSize: "12px",
    "text-anchor":"middle"
    }}
  >
    {score.label}
  </text>
</React.Fragment>

export const ReportTemplate = ({
  versantlogo,
  pearsonlogo,
  partnerlogo
}) => {
  const report = tinsJson;
  return <div className="report">
    <header className="header">
      <div className="row">
        <div className="column1">
          <div className="versant-logo">
            <img src={versantlogo} alt="Versant logo" />
          </div>
        </div>
        <div className="column2">
          <img src={partnerlogo} alt="Co-brand logo" />
        </div>
      </div>
      <div className="row">
        <div className="column1">
          <h2>Versant English Test</h2></div>
        <div className="column2">
          <h3 className="testtaker-name">{ report.name }</h3>
          <div className="column-50">
            <p className="label">Test Completion Date</p>
            <p className="value">{ DateTime.fromMillis(report.endTime).toFormat('dd MMMM yyyy')}</p>
          </div>
          <div className="column-50">
            <p className="label">Test Identification Number</p>
            <p className="value">{ report.tin }</p>
          </div>
        </div>
      </div>
    </header>
    <main className="row">
      <div className="column1">
      <h3>Current Skills and Knowledge</h3>
      <p className="overall-score-descriptor">{report.mainScore.description}</p>
      <div style={{margin:"0 auto"}}><svg className="graph"
      height={420} width="100%">
        <defs>
          <linearGradient id="grad" gradientUnits="userSpaceOnUse" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#017ea0" />
            <stop offset="100%" stop-color="#0093bb" />
          </linearGradient>
        </defs>
        <g transform="translate(-80,-40)">
        <g transform="translate(80,55)">
        <text
        style={{
          fill: "#003058",
          fontSize: "11px",
          fontWeight: "bold"
        }}
        >GSEGen</text>
        </g>
         <g className="xaxis2" transform="translate(125, 420)">
           {Array.from({length: 81}, (v, i) => 
           <React.Fragment key={i}>
             {!(i%5) && <React.Fragment>
             <rect
             style={{
              fill: "rgba(0,0,0,0.1)"
            }}
             x="0"
             y={-i * 4}
             height="1"
             width={i%10 ? 10 : 45}
             ></rect>
             <rect
             style={{
              fill: !(i%10) ? "rgba(0,0,0,0.1)" : "rgba(0,0,0,0.05)"
            }}
             x="75"
             y={-i * 4}
             height="1"
             width={505}
             ></rect>
             </React.Fragment>}
             {!(i % 10) && 
             <text
             x={22}
             y={-i * 4 + 5}
             style={{
               fontSize: "12px",
               fill: "#005a71",
               textAnchor: "middle"
             }}>
               {i + 10}
             </text>
             }
            </React.Fragment>
           )}
         </g>
         <g className="xaxis3" transform="translate(80,100)">
         <text
          x="-50"
          y="-10"
          style={{
            fill: "#003058",
            fontSize: "11px",
            fontWeight: "bold"
          }}
          >CEFR</text>
          {cefrRanges.map((range,i) => <React.Fragment><rect
            key={i}
            x={0}
            y={0}
            width={45}
            height={(90-range.minValue) * 4}
            style={{fill: "rgba(1, 143, 181, 0.4)"}}
          >
          </rect>
          <text
          x={20}
          y={(90-(range.maxValue + range.minValue)/2) * 4 +5}
          style={{
            fontSize: "12px",
            fill: "#fff",
            textAnchor: "middle"
          }}
          >
            {range.label}
          </text>
          </React.Fragment>)}
        </g>
        <g className="dataset">
          {report.scores.map((score, i) => dataset(score, i))}
        </g>
        </g>
      </svg></div>
      </div>
      <div className="column2">
        <div className="main-score">
          <div className="column-50">
            <p className="gse-label">
              Overall Score
            </p>
            <p className="gse-score">
              <span className="gse-score-number">{report.mainScore.gse}</span>
            </p>
            <div className="scoreline">
              <span className="score-legend">10</span>
              <span className="score-legend end">/90</span>
              <div className="score" style={{width: `${(report.mainScore.gse - 10) / 0.8}%`}}></div>
            </div>
            <p className="gse-label">
              <b>GSE</b>GEN
            </p>
          </div>
          <div className="column-50">
            <p>The GSE is fici cora prem ut autae vollatibus ipsa nias estorporatus moluptis ma voluptam nulparc hitaquatia sedis qui doluptur aut a conesti quibus quasimp erferio. </p>
          </div>
        </div>
        <div className="other-scales">
          <h3>A GSEPRO Score of {report.mainScore.gse} is equivalent to</h3>
          <h4>Versant: <span className="score">{report.mainScore.versant}</span> <span className="max">/80</span></h4>
          <p>Pearson’s Versant tests have for many years expressed second language performance on a 20-80 scale. The Global Scale of English is now used for many of these tests.</p>
          <h4>CEFR: <span className="score">{report.mainScore.cefr}</span></h4>
          <p>The Common European Framework of Reference for Languages (CEFR) is an international standard for describing language ability. The levels describe progressive mastery of a language from Beginners at A1 to fully proficient users at C2.</p>
        </div>
      </div>
    </main>
    <div className="row"><hr/></div>
    <div className="row">
      <div className="column1">
      <h3>Current Skills & Knowledge - Details</h3>
        {report.scores.map((score,i) =>
        <React.Fragment key={i}>
        <h3 className="skill-scores">{score.label}:&nbsp;
          <span className="skill-score">{score.gse}</span>
          <span className="skill-max"> /90</span>
          <div className="skill-other-scales">
            <span className="scale-name">Versant: </span>
            <span className="skill-score">{score.versant}</span>
            <span className="skill-max">/80</span>
            <span className="scale-name">CEFR: </span>
            <span className="skill-score">{score.cefr}</span>
          </div>
        </h3>
        <h4>Your capabilities:</h4>
        <p className="skill-descriptor">{score.description}</p>
        <h4>Tips to improve:</h4>
        <ul className="mocked">
          {score.tips.map(tip => <li>
            {tip}
          </li>)}
        </ul>
        </React.Fragment>
        )}
        <div className="other-skills">
          <h3>Additional Performance Information</h3>
          {report.minorScores.map((score,i) =>
          <div className="column-50" key={i}>
            <h4>{score.label}</h4>
            <p className="skill-descriptor score">Level: {score.value}</p>
            <p className="skill-descriptor">{score.definition}</p>
          </div>)}
        </div>
      </div>
      <div className="column2 definitions">
        <h3>Understanding your skills:</h3>
        <h4>Overall</h4>
        <p className="skill-descriptor">{report.mainScore.definition}</p>
        {report.scores.map((score,i) => 
          <React.Fragment key={i}>
            <h4>{score.label}</h4>
            <p className="skill-descriptor">{score.definition}</p>
          </React.Fragment>
        )}
      </div>
    </div>
    <footer className="row">
      <div className="column1">
      <img src={pearsonlogo} alt="Pearson logo" width="120px"
        height="40px"/><br/>
        © 2019 Pearson Education, Inc. or its affiliate(s). All rights reserved.<br/>
      Ordinate and Versant are trademarks, in the U.S. and/or other countries, of Pearson Education, Inc. or its affiliate(s). Other names may be the trademarks of their respective owners.<br/>
      For more information, visit us online at www.VersantTests.com
      </div>
    </footer>
  </div>
}

export default ({ data }) => 
  <Layout>
    <ReportTemplate
      versantlogo={data.markdownRemark.frontmatter.versantlogo}
      pearsonlogo={data.markdownRemark.frontmatter.pearsonlogo}
      partnerlogo={data.markdownRemark.frontmatter.partnerlogo}
    />
  </Layout>

export const pageQuery = graphql`
  query ReportByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        versantlogo
        pearsonlogo
        partnerlogo
      }
    }
  }
`
