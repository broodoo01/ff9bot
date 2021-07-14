const tmi = require('tmi.js');

const fs = require('fs')
fs.readFile('./items with subcats.json', 'utf8', (err, jsonString) => {
  if (err) {
      console.log("Error reading file from disk:", err)
      return
  } try {
      global.json = JSON.parse(jsonString)

  } catch(err) {
        console.log('Error parsing JSON string:', err)
  }

  // take care of !list
  list = Object.keys(json)
  jlist = list.join(', ')
  slist = jlist.toString()
  botSay("!list", slist)

  // take care of categories
  for (cat of list) {
    scat = cat.toString()
    category = Object.keys(json[scat])
    jcategory = category.join(', ')
    scategory = jcategory.toString()
    botSay(`${scat}`, scategory)

    // take care of cat2egories
    for (cat2 of category) {
      scat2 = cat2.toString()
      cat2egory = Object.keys(json[scat][scat2])
      jcat2egory = cat2egory.join(', ')
      scat2egory = jcat2egory.toString()
      botSay(`${scat2}`, scat2egory)

        // take care of description
        for (sub of cat2egory){
          ssub = sub.toString()
          stringvalue = json[scat][scat2][ssub]
          sstringvalue = stringvalue.toString()
          // console.log(`yyy: `, sstringvalue)
          botSay(`${ssub}`, sstringvalue)
        }
    }
  }
});

const client = new tmi.Client({
  options: { debug: true },
  connection: {
    secure: true,
    reconnect: true
  },
  identity: {
    username: '',
    password: ''
  },
  channels: ['']
});

client.connect();

function botSay(command, textstring) {
  client.on('message', (channel, tags, message, self) => {
    // Ignore echoed messages.
    if(self) return;
    if(message.toLowerCase() === command) {
      client.say(item, textstring);
    }
  });
}
