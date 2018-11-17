module.exports = class Locator
{
  constructor(baseName, pathOptions = {})
  {
    this.baseName = baseName;
    this.pathOptions = {...this.defaultPathOptions, ...pathOptions}
  }

  get defaultPathOptions()
  {
    return {
      cwd: null,
      skillDir: null,
      srcDir: null,
      assetDir: null,
      targetDir: null,
      exts: [],
      extPrefix: null
    };
  }

  get path()
  {
    let {cwd, skillDir, srcDir, assetDir, targetDir, exts, extPrefix} = this.pathOptions;
    let [ext] = exts;
    let filename = [this.baseName, extPrefix, ext].filter(prop => (prop != undefined && prop != null)).join('.');
    return [cwd, skillDir, srcDir, assetDir, targetDir, filename].join('/');
  }
}
