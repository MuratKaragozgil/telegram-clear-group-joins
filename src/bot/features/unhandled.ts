import {Composer} from 'grammy'
import type {Context} from '#root/bot/context.js'
import {logHandle} from '#root/bot/helpers/logging.js'

const composer = new Composer<Context>()

const feature = composer.chatType(['group', 'supergroup', 'channel'])

feature.on('message', logHandle('unhandled-message'), async (ctx) => {
    const message = ctx.message;

    // Check if the message is about a user joining via link or being added by an admin
    if (message.new_chat_members || message.left_chat_member) {
        // Delete the message
        console.log('Deleting join/leave message');
        try {
            ctx.deleteMessage().then(() => console.log('Deleted join/leave message')).catch(console.error);
            console.log('Deleted join/leave message');
        } catch (error) {
            console.error('Failed to delete message:', error);
        }
    }
})

feature.on('callback_query', logHandle('unhandled-callback-query'), (ctx) => {
    return ctx.answerCallbackQuery()
})

export {composer as unhandledFeature}
