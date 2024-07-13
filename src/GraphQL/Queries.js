import { gql } from '@apollo/client';

// hrmEmployees(where: { name: { contains: $searchTerm } }, after: $after) {
export const EMPLOYEES_QUERY = gql`
   query hrmEmployees($searchTerm: String, $after: String) {
     hrmEmployees(where: { or: [{ name: { contains: $searchTerm } }, { designation: { title: { contains: $searchTerm } } }] }, after: $after) {
      edges {
        node {
          id
          name
          designation {
            title
          }
          contact
          cnic
          email
          createdBy
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
      totalCount
    }
  }
`;