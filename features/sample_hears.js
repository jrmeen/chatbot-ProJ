/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
module.exports = function(controller) {

    // use a function to match a condition in the message
    controller.hears(async(message) => message.text && message.text.toLowerCase() === 'foo', ['message'], async (bot, message) => {
        await bot.reply(message, 'I heard "foo" via a function test');
    });

    // use a regular expression to match the text of the message
    controller.hears(new RegExp(/^\d+$/), ['message','direct_message'], async function(bot, message) {
        await bot.reply(message,{ text: 'I heard a number using a regular expression.' });
    });

    // match any one of set of mixed patterns like a string, a regular expression
    controller.hears(['allcaps', new RegExp(/^[A-Z\s]+$/)], ['message','direct_message'], async function(bot, message) {
        await bot.reply(message,{ text: 'I HEARD ALL CAPS!' });
    });


    controller.hears('hello','message',async(bot, message) => {
        await bot.reply(message, 'Hello human')
    });

    controller.hears(['how r u','how are you','how do you do','Whats up?'],['message'],async(bot, message) => {
        await bot.reply(message,{ text: 'Well enough to chat with you if you wish to' } )
    });

    controller.hears('หวัดดี','message',async(bot, message) => {
        await bot.reply(message, 'สวัสดีจ้าาา')
    });

    controller.interrupts('help', 'message', async(bot, message) => {
        // start a help dialog, then eventually resume any ongoing dialog
        await bot.beginDialog(HELP_DIALOG);
    });
    
    controller.interrupts('quit', 'message', async(bot, message) => {
        await bot.reply(message, 'Quitting!');
    
        // cancel any active dialogs
        await bot.cancelAllDialogs();
    });

    controller.hears(new RegExp(/^reboot (.*?)$/i), 'message', async(bot, message) => {

        // message.matches is the result of message.text.match(regexp) so in this case the parameter is in message.matches[1]
        let param = message.matches[1];
        await bot.reply(message, `I will reboot ${ param }`);
    
    });
}