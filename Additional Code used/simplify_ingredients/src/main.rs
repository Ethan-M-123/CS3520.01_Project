//use std::env;
use std::fs::File;
use std::io::Read;
use std::fs;

fn main() {
    //creates string to save file to
  let mut file_go_here = String::new();

//opens file, if cannot open file, return an error message. Replace **tecks.txt** with any .txt file location for a different file
  let mut file = File::open("ingredients.txt").
          expect("Try again or fail this class");

//Converts file to one long string
  file.read_to_string(&mut file_go_here).
          expect("1st grade illiterate level. Can't read the file yo!");
 
 file_go_here.chars().count();

//convert string to byte vector, letters to ASCII values
 let mut byte_vector = file_go_here.into_bytes();
 
//creates a variable that is the length of the vector
let mut fin = byte_vector.len();




//if byte is 42, pop
// or if byte = 32 && previous byte == 32, then pop current byte
let fin = byte_vector.len();
for mut i in 1..fin{ 

if byte_vector[i] == 58 {
		byte_vector[i-2] = 0;
		byte_vector[i-1] = 0;
		byte_vector[i] = 0;

}
	
else if byte_vector[i] == 32 && byte_vector[i-1] == 32 {
	byte_vector[i] = 0;
}
else if byte_vector[i] == 42 {
	byte_vector[i] = 0;
}

else if byte_vector[i] > 47 && byte_vector[i] < 58 && byte_vector[i-1] == 32{
	byte_vector[i] = 0;
}
else if (byte_vector[i] < 65) || (byte_vector[i] > 90 && byte_vector[i] < 97) || (byte_vector[i] > 122){
	byte_vector[i] = 0;
}
 
else{
	
//do jack all :)
}
}



//convert bytes into letters
//let _new_list = String::from_utf8(byte_vector).unwrap();

//writes to new file with
//		let mut ofile = File::create()?;
//

	let final_form: &[u8] = &byte_vector;



let path = "newtoningredients.txt";
	let mut ofile = File::create(path);


fs::write(path, byte_vector).expect("Unable to write file");


//		ofile.write_all(new_list)?;

}