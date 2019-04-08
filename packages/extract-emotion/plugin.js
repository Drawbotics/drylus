class ExtractEmotionWatchPlugin {
  constructor() {
    this.chunkVersions = {};
  }
  apply(compiler) {
    compiler.hooks.emit.tapAsync('ExtractEmotionWatchPlugin', (compilation, callback) => {
      var changedChunks = compilation.chunks.filter(chunk => {
        var oldVersion = this.chunkVersions[chunk.name];
        this.chunkVersions[chunk.name] = chunk.hash;
        return chunk.hash !== oldVersion;
      });
      console.log('CHANGED CHUNKS',changedChunks.length);
      callback();
    });
  }
}

module.exports = ExtractEmotionWatchPlugin;
