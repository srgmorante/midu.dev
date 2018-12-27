const fs = require('fs')
const readline = require('readline')
const yaml = require('js-yaml')
const {promises: fsPromises} = fs
const FRONT_MATTER_SEPARATOR = '---'

class File {
  static async extractFrontMatterFrom({filename}, attributesToMerge = {}) {
    const input = fs.createReadStream(`./posts/${filename}`)
    const rl = readline.createInterface({input, crlfDelay: Infinity})
    let content = ''
    let found = 0

    return new Promise(resolve => {
      rl.on('line', line => {
        const foundSeparator = line.includes(FRONT_MATTER_SEPARATOR)
        if (foundSeparator) found++
        // check if found two times the separator
        if (found === 2) {
          rl.close()
          const frontMatterInfo = yaml.safeLoad(content)
          const attributes = {...frontMatterInfo, ...attributesToMerge}
          return resolve(attributes)
        } else {
          content += line + '\n'
        }
      })
    })
  }
}

class Slug {
  static createFrom({filename}) {
    return filename.split('.')[0]
  }
}

module.exports = class Posts {
  static async getPosts() {
    const files = await fsPromises.readdir('./posts')
    const postAttributesPromises = files.map(filename => {
      const slug = Slug.createFrom({filename})
      return File.extractFrontMatterFrom({filename}, {slug})
    })
    const postsAttributes = await Promise.all(postAttributesPromises)
    console.log(postsAttributes)
    return postsAttributes
  }

  static async getPostContent() {
    const postsEntries = Posts.getPosts()
    return postsEntries
  }
}
