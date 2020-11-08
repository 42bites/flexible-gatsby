import React from 'react'
import { Link, graphql } from 'gatsby'
import { kebabCase } from 'lodash';
import Img from 'gatsby-image'
import { Helmet } from "react-helmet"

import DefaultLayout from '../components/layout'
import SEO from '../components/seo'

import "katex/dist/katex.min.css"

class BlogPostTemplate extends React.Component {
  render() {
    const post = this.props.data.markdownRemark
    const { previous, next } = this.props.pageContext
    console.log(this.props.data);

    return (
      <DefaultLayout>
        <Helmet>
        <meta property="og:image:width" content="400" />
        <meta property="og:image:width" content="50" />

<meta property="og:url" content={this.slug} />
<meta property="og:type" content="website" />
<meta property="og:title" content={post.frontmatter.title} />
<meta property="og:description" content="{post.frontmatter.excerpt}" />
<meta property="og:image" content={post.frontmatter.img.childImageSharp.fluid.src} />
<meta name="twitter:card" content="summary_large_image"/>
<meta property="twitter:domain" content="gignux.org"/>
<meta property="twitter:url" content={this.slug} />
<meta name="twitter:title" content={post.frontmatter.title} />
<meta name="twitter:description" content={post.frontmatter.excerpt}/>
<meta name="twitter:image" content={post.frontmatter.img.childImageSharp.fluid.src} />

        </Helmet>
        <SEO title={post.frontmatter.title} description={post.excerpt} />
        <div className="clearfix post-content-box">
          <article className="article-page">
            <div className="page-content">
              {post.frontmatter.img && (
                <div className="page-cover-image">
                  <figure>
                    <Img
                      className="page-image"
                      key={post.frontmatter.img.childImageSharp.fluid.src}
                      fluid={post.frontmatter.img.childImageSharp.fluid}
                    />
                  </figure>
                </div>
              )}
              <div className="wrap-content">
                <header className="header-page">
                  <h1 className="page-title">{post.frontmatter.title}</h1>
                  <div className="page-date">
                    <span>{post.frontmatter.date}</span>
                  </div>
                </header>
                <div dangerouslySetInnerHTML={{ __html: post.html }} />
                <div className="page-footer">
                  <div className="page-tag">
                    {post.frontmatter.tags &&
                    post.frontmatter.tags.map(tag => (
                      <span key={tag}>
                        <Link  className="tag" to={`/tags/${kebabCase(tag)}/`}># {tag}</Link>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </article>
        </div>
      </DefaultLayout>
    )
  }
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "DD MMM YYYY")
        tags
        img {
          childImageSharp {
            fluid(maxWidth: 3720) {
              aspectRatio
              base64
              sizes
              src
              srcSet
            }
          }
        }
      }
    }
  }
`
