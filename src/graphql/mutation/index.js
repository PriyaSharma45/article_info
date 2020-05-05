import { gql } from '@apollo/client';

const ADD_ARTICLE = gql(`
    mutation addArticle($author_id:Int!, $title:String!, $published_date:date! ) {
        insert_article(objects: { author_id: $author_id, published_date: $published_date, title: $title}) {
        affected_rows
        }
    }  
`)

const ADD_AUTHOR = gql(`
    mutation AddAuthor($dob : date!, $name: String!) {
        insert_author(objects: {dob: $dob, name: $name}) {
        affected_rows
        }
    }
  
`)

export { ADD_ARTICLE, ADD_AUTHOR }