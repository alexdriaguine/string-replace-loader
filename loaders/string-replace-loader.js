module.exports = function(source) {
  const {pattern, replacement} = this.query
  if (!pattern) throw new Error('string-replace-loader requires a pattern')
  if (!replacement) throw new Error('string-replace-loader requires a replacement')
  
  if (source.indexOf(pattern)) {
    return source.replace(
      pattern,
      typeof replacement === 'function' ? replacement() : replacement
    )
  }
  return source
}
