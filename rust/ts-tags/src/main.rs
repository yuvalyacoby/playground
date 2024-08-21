use core::panic;
use std::path::Path;
use std::path::PathBuf;

use tree_sitter_tags::TagsContext;
use tree_sitter_tags::TagsConfiguration;

use std::fs;

fn main() {
    let mut context = TagsContext::new();

    let javascript_config = TagsConfiguration::new(
        tree_sitter_javascript::language(),
        tree_sitter_javascript::TAGS_QUERY,
        tree_sitter_javascript::LOCALS_QUERY,
    ).unwrap();

    let p = PathBuf::from("/Users/yuvalyacoby/repos/baz/platform/crates/codeseer/tests/snippets/javascript/imports-esm.js");
    let content = fs::read(&p).unwrap();

    let Ok((tags, errors)) = context.generate_tags(
        &javascript_config,
        &content,
        None,
    ) else {
        panic!("Failed to generate tags");
    };
    
    for tag in tags {
        match tag {
            Ok(t) => {
                println!(
                    "name:  {:?}\t",
                    std::str::from_utf8(&content[t.name_range]).unwrap_or(""),
                    );
                    println!(
                    "line text: {:?}\t",
                    std::str::from_utf8(&content[t.line_range]).unwrap_or("")
                    );
                    // println!(
                    // "encapsulating range text: {:?}\t",
                    // std::str::from_utf8(&content[t.range]).unwrap_or("")
                    // );
                    println!("docs: {:?}\t", t.docs);
                    let syntax_type = &javascript_config.syntax_type_name(t.syntax_type_id);
                    println!("syntax type: {:?}\t", syntax_type);
            },
            Err(e) => println!("Error: {:?}", e)
        }
    }
}
