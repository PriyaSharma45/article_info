import { gql } from '@apollo/client';

const GET_AUTHOR_DETAILS = gql(`
    subscription {
        author{
        dob
        id
        name
        articles {
            title
            published_date
        }
        }
    }
`)

export { GET_AUTHOR_DETAILS }