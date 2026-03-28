<?php

use App\Models\WaitListEntry;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

test('waitlist page displays correctly', function () {
    $response = $this->get(route('waitlist'));

    $response->assertStatus(200);
    $response->assertInertia(fn ($page) => $page->component('waitlist'));
});

test('user can join waitlist with valid email', function () {
    $response = $this->withoutMiddleware()->post(route('waitlist.store'), [
        'email' => 'test@example.com',
    ]);

    $response->assertRedirect();
    $this->assertDatabaseHas('wait_list', [
        'email' => 'test@example.com',
    ]);
});

test('email is required to join waitlist', function () {
    $response = $this->withoutMiddleware()->post(route('waitlist.store'), [
        'email' => '',
    ]);

    $response->assertSessionHasErrors('email');
});

test('email must be valid', function () {
    $response = $this->withoutMiddleware()->post(route('waitlist.store'), [
        'email' => 'invalid-email',
    ]);

    $response->assertSessionHasErrors('email');
});

test('duplicate email cannot join waitlist', function () {
    WaitListEntry::create(['email' => 'unique@example.com']);

    $response = $this->withoutMiddleware()->post(route('waitlist.store'), [
        'email' => 'unique@example.com',
    ]);

    $response->assertSessionHasErrors('email');
    $this->assertDatabaseCount('wait_list', 1);
});

test('waitlist page is accessible without authentication', function () {
    $response = $this->get(route('waitlist'));

    $response->assertStatus(200);
});
