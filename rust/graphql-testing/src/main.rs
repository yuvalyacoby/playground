use graphql_client::{GraphQLQuery, Response};
use std::error::Error;
use reqwest::{self, Client};

#[allow(clippy::upper_case_acronyms)]
type URI = String;

#[derive(GraphQLQuery)]
#[graphql(
    schema_path = "src/schema.graphql",
    query_path = "src/query_1.graphql",
    response_derives = "Debug"
)]
pub struct RepoView;

async fn perform_my_query(variables: repo_view::Variables) -> Result<(), Box<dyn Error>> {

    // this is the important line
    let request_body = RepoView::build_query(variables);
    let github_api_token =
        std::env::var("GITHUB_API_TOKEN").expect("Missing GITHUB_API_TOKEN env var");
    let client = Client::builder()
        .user_agent("graphql-rust/0.10.0")
        .default_headers(
            std::iter::once((
                reqwest::header::AUTHORIZATION,
                reqwest::header::HeaderValue::from_str(&format!("Bearer {}", github_api_token))
                    .unwrap(),
            ))
            .collect(),
        )
        .build()?;
    let res = client.post("https://api.github.com/graphql").json(&request_body).send().await?;
    println!("res: {:#?}", res);
    let response_body: Response<repo_view::ResponseData> = res.json().await?;
    let x = response_body.data.unwrap();
    println!("result: {:#?}", x.repository.unwrap());
    Ok(())
}

#[tokio::main]
async fn main() {
    println!("hello world");
    let variables = repo_view::Variables {
        owner: "yuvalyacoby".to_string(),
        name: "playground".to_string(),
    };
    let r = perform_my_query(variables).await;
    match r {
        Ok(_) => println!("Ok"),
        Err(e) => println!("{:#?}", e)
    }
}