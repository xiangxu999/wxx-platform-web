import request from '@/utils/request'

/**
 * 发送普通邮件
 * @param to 收件人地址
 * @param subject 邮件主题
 * @param content 邮件内容
 */
export function sendSimpleMail(to, subject, content) {
  return request({
    url: '/system/mail/simple',
    method: 'post',
    params: {
      to: to,
      subject: subject,
      content: content
    }
  })
}
