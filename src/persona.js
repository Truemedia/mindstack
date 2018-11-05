module.exports = class Persona
{
  constructor(currentCharacter, chars, opts)
  {
    this.character = currentCharacter;
    this.characters = chars;
    this.opts = opts;
  }

  /**
    * Get current character
    */
  get char()
  {
    return this.characters.find(char => (char.profile.givenName == this.character));
  }

  /**
    * Set current character
    */
  set char(givenName)
  {
    this.character = givenName;
  }

  /**
    * Sync character data between instance and client
    */
  sync(client)
  {
    let member = client.guilds.first().members.get(client.user.id);

    // Character needs syncing from either side
    if (member.nickname != this.character) {
      if (this.opts.inherit) { // Client sync
        this.char = member.nickname;
      } else { // Server sync
        member.setNickname(this.char.profile.givenName);
        client.user.setAvatar(this.char.profile.pfp).catch(console.error);
        client.user.setActivity('Chatting');
      }
    }
  }
}
