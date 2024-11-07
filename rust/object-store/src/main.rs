use std::sync::Arc;

use object_store::ObjectStore;
use object_store::aws::{AmazonS3 ,AmazonS3Builder};
use object_store::local::LocalFileSystem;
use object_store::path::Path;
use object_store::*;
use futures::TryStreamExt;

const BUCKET_NAME: &str = "test-object-store";

#[tokio::main]
async fn main() {
    let s3 = AmazonS3Builder::from_env().with_bucket_name(BUCKET_NAME).build().unwrap();
    
    // list 
    // let p = Path::from_url_path("/").unwrap();

    // let r: Vec<_> = s3.list(Some(&p)).try_collect().await.unwrap();
    // println!("{:#?}", r);

    // put - for S3 - it creats it for you, also recursive folders
    let p = Path::from_url_path("foo/bar/test2.txt").unwrap();
    s3.put(&p, "goo goo".into()).await.unwrap();

    // delete
    // let p = Path::from_url_path("foo/bar/test.txt").unwrap();
    // s3.delete(&p).await.unwrap();

    // get
    let p = Path::from_url_path("foo/bar/test2.txt").unwrap();
    println!("writing to path: {:#?}", p);
    let r = s3.get(&p).await.unwrap();
    println!("{:#?}", String::from_utf8(r.bytes().await.unwrap().to_vec()));
}