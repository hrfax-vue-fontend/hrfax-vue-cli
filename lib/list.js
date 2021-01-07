/*
 * @Author: your name
 * @Date: 2021-01-07 14:05:06
 * @LastEditTime: 2021-01-07 15:11:32
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \frontend-cli-master\lib\list.js
 */
const request = require('request');
const chalk = require('chalk')
const ora = require('ora')
module.exports = () => {
  let spinner = ora('\n ' + chalk.yellow('正在查询模版列表，请等待...'));
  spinner.start();
  request({
    url: 'https://api.github.com/users/hrfax-vue-fontend/repos',
    headers: {
      'User-Agent': 'hrfax-vue-cli'
    }
  }, (err, res, body) => {
    spinner.stop();
    if (err) {
      console.log(chalk.red('查询模版列表失败'))
      console.log(chalk.red(err))
      process.exit();
    }
    const requestBody = JSON.parse(body)
    if (Array.isArray(requestBody)) {
      console.log()
      console.log(chalk.green('可用的模版列表：'))
      console.log()
      requestBody.forEach(repo => {
        console.log(
        '  ' + chalk.yellow('★') +
        '  ' + chalk.blue(repo.name) +
        ' - ' + repo.description)
      })
    } else {
      console.error(requestBody.message)
    }
  })
}