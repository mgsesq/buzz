import assert from "node:assert/strict";
import { test } from "node:test";

import {
  anonymousPublicForgeFromUrl,
  anonymousPublicForgeName,
  isAnonymousPublicForgeHost,
} from "./projectExternalForge.ts";

test("recognizes public GitHub and GitLab hosts for anonymous clone", () => {
  assert.equal(isAnonymousPublicForgeHost("github.com"), true);
  assert.equal(isAnonymousPublicForgeHost("gitlab.com"), true);
  assert.equal(isAnonymousPublicForgeHost("bitbucket.org"), false);
  assert.equal(anonymousPublicForgeName("gitlab.com"), "GitLab");
});

test("reads the forge from a clone URL without trusting path shape", () => {
  assert.deepEqual(
    anonymousPublicForgeFromUrl("https://gitlab.com/group/sub/project.git"),
    { host: "gitlab.com", name: "GitLab" },
  );
  assert.equal(
    anonymousPublicForgeFromUrl("https://gitlab.example.com/group/project"),
    null,
  );
});
