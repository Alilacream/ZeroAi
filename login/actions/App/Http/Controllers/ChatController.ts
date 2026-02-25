import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\ChatController::__invoke
* @see app/Http/Controllers/ChatController.php:9
* @route '/chat'
*/
const ChatController = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: ChatController.url(options),
    method: 'get',
})

ChatController.definition = {
    methods: ["get","head"],
    url: '/chat',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ChatController::__invoke
* @see app/Http/Controllers/ChatController.php:9
* @route '/chat'
*/
ChatController.url = (options?: RouteQueryOptions) => {
    return ChatController.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ChatController::__invoke
* @see app/Http/Controllers/ChatController.php:9
* @route '/chat'
*/
ChatController.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: ChatController.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ChatController::__invoke
* @see app/Http/Controllers/ChatController.php:9
* @route '/chat'
*/
ChatController.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: ChatController.url(options),
    method: 'head',
})

export default ChatController