import rollupPluginSummary from 'rollup-plugin-summary';

export default rollupPluginSummary({
  showBrotliSize: true,
  showGzippedSize: true,
  showMinifiedSize: true,
});
