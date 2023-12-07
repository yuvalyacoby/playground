directory='../../typescript/dynamicLoading/versions'
prefixToRemove='../../typescript/dynamicLoading'
outputFile='../../typescript/dynamicLoading/testOutput.ts'

for file in "$directory"/*; do
    fileName=${file##*$prefixToRemove/}
    fileNoExtension=${fileName%.ts*}
    if [ "$(cat $outputFile | grep -c $fileNoExtension)" -ge 1 ]
        then echo "migration  for $fileNoExtension already exsits";
        else
            echo "export * from './$fileNoExtension';" >> $outputFile
    fi    
done
echo "finished writing all versions to file!"

# comment