import {Composer} from 'grammy'
import type {Context} from '#root/bot/context.js'

const composer = new Composer<Context>()

const feature = composer.chatType('private')


export {composer as languageFeature}
