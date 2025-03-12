module.exports = {

"[project]/.next-internal/server/app/api/v1/auth/token/route/actions.js [app-rsc] (server actions loader, ecmascript)": (function(__turbopack_context__) {

var { g: global, d: __dirname, m: module, e: exports } = __turbopack_context__;
{
}}),
"[externals]/next/dist/compiled/next-server/app-route.runtime.dev.js [external] (next/dist/compiled/next-server/app-route.runtime.dev.js, cjs)": (function(__turbopack_context__) {

var { g: global, d: __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route.runtime.dev.js"));

module.exports = mod;
}}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)": (function(__turbopack_context__) {

var { g: global, d: __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}}),
"[externals]/next/dist/compiled/next-server/app-page.runtime.dev.js [external] (next/dist/compiled/next-server/app-page.runtime.dev.js, cjs)": (function(__turbopack_context__) {

var { g: global, d: __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page.runtime.dev.js"));

module.exports = mod;
}}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)": (function(__turbopack_context__) {

var { g: global, d: __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)": (function(__turbopack_context__) {

var { g: global, d: __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)": (function(__turbopack_context__) {

var { g: global, d: __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}}),
"[project]/app/api/v1/auth/token/route.js [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, d: __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "GET": (()=>GET),
    "POST": (()=>POST),
    "dynamic": (()=>dynamic)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$2$2e$2$2d$canary$2e$1_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.2.2-canary.1_react-dom@19.0.0_react@19.0.0/node_modules/next/server.js [app-route] (ecmascript)");
;
const dynamic = 'force-static';
async function POST(request) {
    // Parse form data from request
    const formData = await request.formData();
    const grantType = formData.get('grant_type');
    const username = formData.get('username');
    const password = formData.get('password');
    const clientId = formData.get('client_id');
    // Simple validation
    if (!grantType || !clientId) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$2$2e$2$2d$canary$2e$1_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'invalid_request',
            error_description: 'Missing required parameters'
        }, {
            status: 400
        });
    }
    // For password grant type
    if (grantType === 'password' && (!username || !password)) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$2$2e$2$2d$canary$2e$1_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'invalid_grant',
            error_description: 'Invalid credentials'
        }, {
            status: 400
        });
    }
    // Mock successful response
    const mockToken = {
        access_token: 'eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJfT3B2Ym1RQTZGWl9NX2tzLWxpQlE4WFM0UkRFY0xfZHFMSGJlNkxJUjlNIn0.eyJleHAiOjE3MDk2ODY5NjAsImlhdCI6MTcwOTY4NjY2MCwianRpIjoiNDU2YzY4ZGItZWJkZC00OWNlLTkwMzQtNmQ5NjhmZDY0NTI4IiwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo4MDgwL3JlYWxtcy9uaWdodGNyYXdsZXIiLCJhdWQiOlsibmlnaHRjcmF3bGVyLWFwaSIsImFjY291bnQiXSwic3ViIjoiMTIzNDU2Nzg5MCIsInR5cCI6IkJlYXJlciIsImF6cCI6Im5pZ2h0Y3Jhd2xlci1hcHAiLCJzZXNzaW9uX3N0YXRlIjoiYTJlZjJkMzQtM2UyNC00MTIwLTk4ZDAtYzJiNmYzYzVhMzYxIiwiYWNyIjoiMSIsImFsbG93ZWQtb3JpZ2lucyI6WyJodHRwOi8vbG9jYWxob3N0OjMwMDAiXSwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbIm9mZmxpbmVfYWNjZXNzIiwidW1hX2F1dGhvcml6YXRpb24iLCJkZWZhdWx0LXJvbGVzLW5pZ2h0Y3Jhd2xlciJdfSwicmVzb3VyY2VfYWNjZXNzIjp7Im5pZ2h0Y3Jhd2xlci1hcGkiOnsicm9sZXMiOlsidXNlciJdfSwiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJwcm9maWxlIGVtYWlsIiwic2lkIjoiYTJlZjJkMzQtM2UyNC00MTIwLTk4ZDAtYzJiNmYzYzVhMzYxIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsIm5hbWUiOiJUZXN0IFVzZXIiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJ0ZXN0dXNlciIsImdpdmVuX25hbWUiOiJUZXN0IiwiZmFtaWx5X25hbWUiOiJVc2VyIiwiZW1haWwiOiJ0ZXN0QGV4YW1wbGUuY29tIn0.XYZ',
        expires_in: 300,
        refresh_expires_in: 1800,
        refresh_token: 'eyJhbGciOiJIUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICIyMzYyYWM3Yy1hZDVkLTQ4ZWUtODEzOC1iNDJmZmJkNzZhZjEifQ.eyJleHAiOjE3MDk2ODg0NjAsImlhdCI6MTcwOTY4NjY2MCwianRpIjoiOWJjY2E3YTMtMGY1Ni00YjkzLWJmZjgtOGQxYzRkNzM5ZGU2IiwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo4MDgwL3JlYWxtcy9uaWdodGNyYXdsZXIiLCJhdWQiOiJodHRwOi8vbG9jYWxob3N0OjgwODAvcmVhbG1zL25pZ2h0Y3Jhd2xlciIsInN1YiI6IjEyMzQ1Njc4OTAiLCJ0eXAiOiJSZWZyZXNoIiwiYXpwIjoibmlnaHRjcmF3bGVyLWFwcCIsInNlc3Npb25fc3RhdGUiOiJhMmVmMmQzNC0zZTI0LTQxMjAtOThkMC1jMmI2ZjNjNWEzNjEiLCJzY29wZSI6InByb2ZpbGUgZW1haWwiLCJzaWQiOiJhMmVmMmQzNC0zZTI0LTQxMjAtOThkMC1jMmI2ZjNjNWEzNjEifQ.ABC',
        token_type: 'Bearer',
        'not-before-policy': 0,
        session_state: 'a2ef2d34-3e24-4120-98d0-c2b6f3c5a361',
        scope: 'profile email'
    };
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$2$2e$2$2d$canary$2e$1_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(mockToken);
}
async function GET() {
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$2$2e$2$2d$canary$2e$1_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
        error: 'method_not_allowed',
        error_description: 'HTTP method not allowed'
    }, {
        status: 405
    });
}
}}),

};

//# sourceMappingURL=%5Broot%20of%20the%20server%5D__45e2eb3e._.js.map