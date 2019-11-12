const contracstFolderPath = path.resolve('zkp', 'contracts');

const buildSources = () => {
  const sources = {};
  const contractsFiles = fs.readdirSync(contractsFolderPath);
  
  contractsFiles.forEach(file => {
    const contractFullPath = path.resolve(contractsFolderPath, file);
    sources[file] = {
      content: fs.readFileSync(contractFullPath, 'utf8')
    };
  });
  
  return sources;
}