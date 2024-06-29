// LETS GOOOO
import { utilService } from "../../../services/util.service.js";
import { storageService } from "../../../services/async-storage.service.js";

const EMAIL_KEY = "emailDB";
_createEmails();

// hard coded user, no need to build login system

const loggedinUser = {
  email: "user@appsus.com",
  fullname: "Mahatma Appsus",
};

const filterBy = {
  status: "inbox/sent/trash/draft",
  txt: "puki", // no need to support complex text search
  isRead: true, // (optional property, if missing: show all)
  isStarred: true, // (optional property, if missing: show all)
  lables: ["important", "romantic"], // has any of the labels
};

function query(filterBy = {}) {
  return storageService.query(EMAIL_KEY).then((emails) => {
    if (filterBy.folder) {
      if (filterBy.folder === "starred") {
        emails = emails.filter((email) => email.isStarred);
      } else {
        emails = emails.filter((email) => email.folder === filterBy.folder);
      }
    }
    if (filterBy.subject) {
      const regExp = new RegExp(filterBy.subject, "i");
      emails = emails.filter((email) => regExp.test(email.subject));
    }
    if (filterBy.isRead !== undefined) {
      emails = emails.filter((email) => email.isRead === filterBy.isRead);
    }
    if (filterBy.isStarred !== undefined) {
      emails = emails.filter((email) => email.isStarred === filterBy.isStarred);
    }
    return emails;
  });
}

function get(emailId) {
  return storageService
    .get(EMAIL_KEY, emailId)
    .then((email) => _setNextPrevEmailId(email));
}

async function remove(emailId) {
  const email = await get(emailId);
  if (email.folder === "trash") {
    return await storageService.remove(EMAIL_KEY, emailId);
  }

  email.folder = "trash";
  return await save(email);
}

function save(email) {
  if (email.id) {
    return storageService.put(EMAIL_KEY, email);
  } else {
    return storageService.post(EMAIL_KEY, email);
  }
}

function getEmptyEmail() {
  return {
    id: "",
    createdAt: Date.now(),
    subject: "",
    body: "",
    isRead: false,
    isStarred: false,
    sentAt: Date.now(),
    removedAt: null,
    from: "Me",
    to: "",
    folder: "sent",
  };
}

function getDefaultFilter() {
  return {
    subject: "",
    readStatus: "all",
  };
}

function _createEmails() {
  let emails = utilService.loadFromStorage(EMAIL_KEY);
  if (!emails || !emails.length) {
    emails = [
      {
        id: "e101",
        createdAt: 1551133930500,
        subject: "Miss you!",
        body: "Would love to catch up sometimes",
        isRead: false,
        isStarred: false,
        sentAt: 1551133930594,
        removedAt: null,
        from: "momo@momo.com",
        to: "user@appsus.com",
        folder: "inbox",
      },
      {
        id: "e102",
        createdAt: 1551133930500,
        subject: "MAAA ???",
        body: "Maaa ? Maa ??? Ma ?? Ma ??? Maaa ? Maa ??? Maaaaa ?? Maa ? Ma ? Ma ??? Ma ? Ma ?? Ma ?? Ma ??? Ma ??? Ma ??? Ma ??? Ma ??? Ma ??? Ma ??? Ma ??? Ma ??? Ma ??? Ma ??? Ma ???",
        isRead: false,
        isStarred: true,
        sentAt: 1551133930594,
        removedAt: null,
        from: "MrLatin@Hapijamot.co.il",
        to: "user@appsus.com",
        folder: "inbox",
      },
      {
        id: "e103",
        createdAt: 1551133930500,
        subject: "BE THE PRESIDENT",
        body: "Hi thier, i would like to invite you to the white house, i think you can teach us alot about react js css and html, and also i would like you to be the new president of United States of America! i think this rule is suit for ya boy",
        isRead: false,
        isStarred: false,
        sentAt: 1551133930594,
        removedAt: null,
        from: "BarakObama@USA.WhiteHouse",
        to: "user@appsus.com",
        folder: "inbox",
      },
      {
        id: "e104",
        createdAt: 1551133930500,
        subject: "Hey Friend! do you like fame and glory?",
        body: "Look, iLook, I dont usually do this whole email thing, but things are a bit Messi with the Argentina team, I was looking for a new genius and YOU are the one we have been waited for! Now, I dont know your football managing credentials, but hey, you clicked on this email, didnt you? Thats gotta count for something. Besides, Maradona once said The ball doesnt know what language you speak, and Im pretty sure he wasnt talking about English. So, what do you say? up for the challenge? Lionel Messi. P.S. Dont worry, Ill teach you the secret handshake. It involves a lot of head-scratching and pointing dramatically into the distance. Looks deep, you know? ",
        isRead: false,
        isStarred: false,
        sentAt: 1551133930594,
        removedAt: null,
        from: "LionelMessi@Argentia.com",
        to: "user@appsus.com",
        folder: "inbox",
      },
      {
        id: "e105",
        createdAt: 1551133930500,
        subject: "Free unicorn ride",
        body: "Hi there! You've won a free unicorn ride. Our unicorns are friendly and come with a complimentary rainbow. Remember to bring a carrot, unicorns love them! Book your ride today.",
        isRead: false,
        isStarred: false,
        sentAt: 1551133930594,
        removedAt: null,
        from: "rides@unicorns.com",
        to: "user@appsus.com",
        folder: "inbox",
      },
      {
        id: "e106",
        createdAt: 1551133930500,
        subject: "You've won a free sandwich!",
        body: "Congratulations! You've won a free sandwich! Just show this email to your sandwich maker. P.S. We are out of bread, lettuce, tomatoes, cheese, and meat. But hey, free napkins!",
        isRead: false,
        isStarred: false,
        sentAt: 1551133930594,
        removedAt: null,
        from: "sandwich@freefood.com",
        to: "user@appsus.com",
        folder: "inbox",
      },
      {
        id: "e107",
        createdAt: 1551133930500,
        subject: "Your cat has been accepted to Harvard",
        body: "Dear Sir/Madam, we are pleased to inform you that your cat, Whiskers, has been accepted to Harvard University. Orientation will include a mouse-catching seminar and a workshop on how to ignore humans effectively.",
        isRead: false,
        isStarred: false,
        sentAt: 1551133930594,
        removedAt: null,
        from: "admissions@harvard.edu",
        to: "user@appsus.com",
        folder: "inbox",
      },
      {
        id: "e108",
        createdAt: 1551133930500,
        subject: "Alien abduction survey",
        body: "Hello! We're conducting a survey on alien abductions. Have you been abducted by aliens? If yes, please rate your experience from 1 to 5 stars. Your feedback is out of this world!",
        isRead: false,
        isStarred: false,
        sentAt: 1551133930594,
        removedAt: null,
        from: "ufo@aliensurvey.com",
        to: "user@appsus.com",
        folder: "inbox",
      },
      {
        id: "e109",
        createdAt: 1551133930500,
        subject: "Time travel opportunity",
        body: "Greetings! We are from the year 3024 and would like to offer you an exclusive time travel opportunity. Visit the future, meet your descendants, and see flying cars! Limited slots available, book your trip now!",
        isRead: false,
        isStarred: false,
        sentAt: 1551133930594,
        removedAt: null,
        from: "future@timetravel.com",
        to: "user@appsus.com",
        folder: "inbox",
      },
      {
        id: "e110",
        createdAt: 1551133930500,
        subject: "Magic wand recall",
        body: "Attention all wizards and witches! We've identified a defect in our latest batch of magic wands. If your wand turns you into a frog instead of casting spells, please return it immediately for a full refund.",
        isRead: false,
        isStarred: false,
        sentAt: 1551133930594,
        removedAt: null,
        from: "support@magicshop.com",
        to: "user@appsus.com",
        folder: "inbox",
      },
      {
        id: "e111",
        createdAt: 1551133930500,
        subject: "Your personal dragon",
        body: "Congratulations! You have been selected to receive a personal dragon. Please ensure you have a large enough backyard and plenty of dragon treats. Delivery expected by end of the week. P.S. Dragon sitting services available.",
        isRead: false,
        isStarred: false,
        sentAt: 1551133930594,
        removedAt: null,
        from: "dragons@fantasyworld.com",
        to: "user@appsus.com",
        folder: "inbox",
      },
      {
        id: "e112",
        createdAt: 1551133930500,
        subject: "Invisible ink instructions",
        body: "Dear User, thank you for purchasing our invisible ink. To view your message, please stare at the paper intently while humming your favorite tune. If that doesn't work, try turning the lights on. Good luck!",
        isRead: false,
        isStarred: false,
        sentAt: 1551133930594,
        removedAt: null,
        from: "support@invisibleink.com",
        to: "user@appsus.com",
        folder: "inbox",
      },
      {
        id: "e113",
        createdAt: 1551133930500,
        subject: "Zombie apocalypse survival kit",
        body: "Hello! As part of our preparedness campaign, we are offering a free zombie apocalypse survival kit. Includes a zombie disguise, brain-shaped candies, and a guide on making friends with zombies. Stay safe!",
        isRead: false,
        isStarred: false,
        sentAt: 1551133930594,
        removedAt: null,
        from: "support@zombiesurvival.com",
        to: "user@appsus.com",
        folder: "inbox",
      },
      {
        id: "e114",
        createdAt: 1551133930500,
        subject: "Talking dog convention",
        body: "Woof! You're invited to the first-ever Talking Dog Convention. Meet other talking dogs, attend bark-shops, and learn the latest in human training techniques. Bring your dog and enjoy a paw-some day!",
        isRead: false,
        isStarred: false,
        sentAt: 1551133930594,
        removedAt: null,
        from: "info@talkingdogconvention.com",
        to: "user@appsus.com",
        folder: "inbox",
      }
    ];
    utilService.saveToStorage(EMAIL_KEY, emails);
  }
}

function _setNextPrevEmailId(email) {
  return storageService.query(EMAIL_KEY).then((emails) => {
    const emailIdx = emails.findIndex((currEmail) => currEmail.id === email.id);
    const nextEmail = emails[emailIdx + 1] ? emails[emailIdx + 1] : emails[0];
    const prevEmail = emails[emailIdx - 1]
      ? emails[emailIdx - 1]
      : emails[emails.length - 1];
    email.nextCarId = nextEmail.id;
    email.prevCarId = prevEmail.id;
    return email;
  });
}

function getFilterFromSearchParams(searchParams) {
  const txt = searchParams.get("txt") || "";
  const isRead = searchParams.get("isRead") === "true";
  const isStarred = searchParams.get("isStarred") === "true";
  return {
    txt,
    isRead,
    isStarred,
  };
}

async function markAsRead(emailId) {
  const email = await get(emailId);
  email.isRead = true;
  return save(email);
}

async function toggleStar(emailId) {
  const email = await get(emailId);
  email.isStarred = !email.isStarred;
  return save(email);
}

function getUnreadCount(emails) {
  const result = {};
  for (const email of emails) {
    // make sure folder name is in result object
    if (!result[email.folder]) {
      result[email.folder] = 0;
    }

    // increase the count if email is unread
    if (!email.isRead) {
      result[email.folder]++;
    }
  }
  return result;
}

export const mailService = {
  query,
  get,
  remove,
  save,
  getEmptyEmail,
  getDefaultFilter,
  getFilterFromSearchParams,
  markAsRead,
  toggleStar,
  getUnreadCount,
};
