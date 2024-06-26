// LETS GOOOO
import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage.service.js'

// hard coded user, no need to build login system

const loggedinUser = {
  email: 'user@appsus.com',
  fullname: 'Mahatma Appsus',
}

const filterBy = {
  status: 'inbox/sent/trash/draft',
  txt: 'puki', // no need to support complex text search
  isRead: true, // (optional property, if missing: show all)
  isStared: true, // (optional property, if missing: show all)
  lables: ['important', 'romantic'], // has any of the labels
}

const EMAIL_KEY = 'emailDB'

_createEmails()

export const mailService = {
  query,
  get,
  remove,
  save,
  getEmptyEmail,
  getDefaultFilter,
  getFilterFromSearchParams,
}

function query(filterBy = {}) {
  return storageService.query(EMAIL_KEY).then((emails) => {
    if (filterBy.subject) {
      const regExp = new RegExp(filterBy.subject, 'i')
      emails = emails.filter((email) => regExp.test(email.subject))
    }
    if (filterBy.isRead !== undefined) {
      emails = emails.filter((email) => email.isRead === filterBy.isRead)
    }
    if (filterBy.isStared !== undefined) {
      emails = emails.filter((email) => email.isStared === filterBy.isStared)
    }
    return emails
  })
}

function get(emailId) {
  return storageService
    .get(EMAIL_KEY, emailId)
    .then((email) => _setNextPrevCarId(email))
}

function remove(emailId) {
  return storageService.remove(EMAIL_KEY, emailId)
}

function save(email) {
  if (email.id) {
    return storageService.put(EMAIL_KEY, email)
  } else {
    return storageService.post(EMAIL_KEY, email)
  }
}

function getEmptyEmail() {
  return {
    id: '',
    createdAt: Date.now(),
    subject: '',
    body: '',
    isRead: false,
    sentAt: Date.now(),
    removedAt: null,
    from: '',
    to: '',
  }
}

function getDefaultFilter() {
  return {
    subject: '',
    readStatus: 'all',
  }
}

function getFilterFromSearchParams(searchParams) {
  // return Object.fromEntries(searchParams)
  const txt = searchParams.get('txt') || ''
  const minSpeed = searchParams.get('minSpeed') || ''
  return {
    txt,
    minSpeed,
  }
}

function _createEmails() {
  let emails = utilService.loadFromStorage(EMAIL_KEY)
  if (!emails || !emails.length) {
    emails = [
      {
        id: 'e101',
        createdAt: 1551133930500,
        subject: 'Miss you!',
        body: 'Would love to catch up sometimes',
        isRead: false,
        sentAt: 1551133930594,
        removedAt: null,
        from: 'momo@momo.com',
        to: 'user@appsus.com',
      },
      {
        id: 'e102',
        createdAt: 1551133930500,
        subject: 'MAAA ???',
        body: 'Maaa ? Maa ??? Ma ?? Ma ??? Maaa ? Maa ??? Maaaaa ?? Maa ? Ma ? Ma ??? Ma ? Ma ?? Ma ?? Ma ??? Ma ??? Ma ??? Ma ??? Ma ??? Ma ??? Ma ??? Ma ??? Ma ??? Ma ??? Ma ??? Ma ???',
        isRead: false,
        sentAt: 1551133930594,
        removedAt: null,
        from: 'MrLatin@Hapijamot.co.il',
        to: 'user@appsus.com',
      },
      {
        id: 'e103',
        createdAt: 1551133930500,
        subject: 'BE THE PRESIDENT',
        body: 'Hi thier, i would like to invite you to the white house, i think you can teach us alot about react js css and html, and also i would like you to be the new president of United States of America! i think this rule is suit for ya boy',
        isRead: false,
        sentAt: 1551133930594,
        removedAt: null,
        from: 'BarakObama@USA.WhiteHouse',
        to: 'user@appsus.com',
      },
      {
        id: 'e104',
        createdAt: 1551133930500,
        subject: 'Hey Friend! do you like fame and glory?',
        body: 'Look, iLook, I dont usually do this whole email thing, but things are a bit Messi with the Argentina team, I was looking for a new genius and YOU are the one we have been waited for! Now, I dont know your football managing credentials, but hey, you clicked on this email, didnt you? Thats gotta count for something. Besides, Maradona once said The ball doesnt know what language you speak, and Im pretty sure he wasnt talking about English. So, what do you say? up for the challenge? Lionel Messi. P.S. Dont worry, Ill teach you the secret handshake. It involves a lot of head-scratching and pointing dramatically into the distance. Looks deep, you know? ',
        isRead: false,
        sentAt: 1551133930594,
        removedAt: null,
        from: 'LionelMessi@Argentia.com',
        to: 'user@appsus.com',
      },
      {
        id: 'e105',
        createdAt: 1551133930500,
        subject: 'fifth email',
        body: 'blah blah blah blah blah',
        isRead: false,
        sentAt: 1551133930594,
        removedAt: null,
        from: 'momo@momo.com',
        to: 'user@appsus.com',
      },
    ]
    utilService.saveToStorage(EMAIL_KEY, emails)
  }
}

function _setNextPrevCarId(email) {
  return storageService.query(EMAIL_KEY).then((emails) => {
    const emailIdx = emails.findIndex((currEmail) => currEmail.id === email.id)
    const nextEmail = emails[emailIdx + 1] ? emails[emailIdx + 1] : emails[0]
    const prevEmail = emails[emailIdx - 1]
      ? emails[emailIdx - 1]
      : emails[emails.length - 1]
    email.nextCarId = nextEmail.id
    email.prevCarId = prevEmail.id
    return email
  })
}
