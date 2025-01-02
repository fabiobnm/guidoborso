import { gql } from '@apollo/client';

export const GET_POSTS = gql`
  query {
    progettis {
      id
      nome
      info
      cover {
        id
        url
      }
      galleria(first: 100) {
        url
      }
    }
  }
`;

export const GET_POSTSDailyDose2025 = gql`
  query {
   dailyDose2025S {
     id
    post(first: 370, orderBy: id_DESC){
      id
      foto{
        url
        
      }
      gallery{
      url
      }
      testo
      
    }
   }  
}
`;

export const GET_POSTSToday = gql`
query MyQuery {
  progetti(where: {id: "cm2kk8clmkobm07l6qhrydbxa"}) {
    nome
   galleria(first: 100){
      url
    }
  }
}
`;

export const GET_POSTSRussia = gql`
query MyQuery {
  progetti(where: {id: "cm3jci1bv5wfp07mv8oglvn8t"}) {
    nome
   galleria(first: 100){
      url
    }
  }
}
`;

export const GET_POSTSDailyDose = gql`
query MyQuery {
  progetti(where: {id: "cm3jct37h5xvj07mv04uslila"}) {
    nome
   galleria(first: 100){
      url
    }
  }
}
`;

export const GET_POSTSHome = gql`
  query {
    homePages {
      id
      cover {
        url
      }
    }
  }
`;


export const GET_POSTSEduc = gql`
  query {
  educationals {
    id
    titolo
    copertina{
      id
      url
    }
      retro{
      id
      url
    }
    info
    
    
  }
  }
  `;


export const GET_POSTS2 = gql`
  query {
    progettis {
      id
      nome
      info
      cover {
        id
        url
      }
      galleria(first: 3) {
        url
      }
    }
  }
`;
