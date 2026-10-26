import { describe, it, expect } from "vitest";
import {
  normalizeUrl,
  isBlockedIp,
  isBlockedHost,
} from "./safe-fetch";

describe("normalizeUrl", () => {
  it("adiciona https quando falta protocolo", () => {
    expect(normalizeUrl("example.com")).toBe("https://example.com/");
  });
  it("remove credenciais e fragmento", () => {
    expect(normalizeUrl("https://user:pass@example.com/path#frag")).toBe("https://example.com/path");
  });
  it("rejeita porta não permitida", () => {
    expect(normalizeUrl("https://example.com:8080/")).toBeNull();
  });
  it("aceita portas 80 e 443", () => {
    expect(normalizeUrl("http://example.com:80/")).toBe("http://example.com/");
    expect(normalizeUrl("https://example.com:443/")).toBe("https://example.com/");
  });
  it("rejeita protocolo não http(s)", () => {
    expect(normalizeUrl("ftp://example.com")).toBeNull();
    expect(normalizeUrl("file:///etc/passwd")).toBeNull();
  });
  it("rejeita vazio", () => {
    expect(normalizeUrl("")).toBeNull();
    expect(normalizeUrl("   ")).toBeNull();
  });
});

describe("isBlockedIp", () => {
  it("bloqueia loopback IPv4", () => {
    expect(isBlockedIp("127.0.0.1")).toBe(true);
    expect(isBlockedIp("127.255.255.255")).toBe(true);
  });
  it("bloqueia 10.x", () => {
    expect(isBlockedIp("10.0.0.1")).toBe(true);
    expect(isBlockedIp("10.255.255.255")).toBe(true);
  });
  it("bloqueia 172.16-31", () => {
    expect(isBlockedIp("172.16.0.1")).toBe(true);
    expect(isBlockedIp("172.31.255.255")).toBe(true);
    expect(isBlockedIp("172.15.0.1")).toBe(false);
  });
  it("bloqueia 192.168.x", () => {
    expect(isBlockedIp("192.168.1.1")).toBe(true);
  });
  it("bloqueia metadata cloud 169.254.169.254", () => {
    expect(isBlockedIp("169.254.169.254")).toBe(true);
  });
  it("bloqueia link-local 169.254.x", () => {
    expect(isBlockedIp("169.254.0.1")).toBe(true);
  });
  it("bloqueia multicast e reserved", () => {
    expect(isBlockedIp("224.0.0.1")).toBe(true);
    expect(isBlockedIp("240.0.0.1")).toBe(true);
  });
  it("permite IP público", () => {
    expect(isBlockedIp("8.8.8.8")).toBe(false);
    expect(isBlockedIp("1.1.1.1")).toBe(false);
  });
  it("bloqueia IPv4 em decimal/octal/hex (normalizado via ipToLong)", () => {
    // 2130706433 = 127.0.0.1 em decimal
    expect(isBlockedIp("2130706433")).toBe(true);
  });
  it("bloqueia loopback IPv6", () => {
    expect(isBlockedIp("::1")).toBe(true);
  });
  it("bloqueia unique local IPv6", () => {
    expect(isBlockedIp("fc00::1")).toBe(true);
    expect(isBlockedIp("fd12:3456:789a::1")).toBe(true);
  });
  it("bloqueia link-local IPv6", () => {
    expect(isBlockedIp("fe80::1")).toBe(true);
  });
  it("bloqueia multicast IPv6", () => {
    expect(isBlockedIp("ff02::1")).toBe(true);
  });
  it("bloqueia IPv4-mapped loopback", () => {
    expect(isBlockedIp("::ffff:127.0.0.1")).toBe(true);
  });
  it("permite IPv6 público", () => {
    expect(isBlockedIp("2606:4700:4700::1111")).toBe(false);
  });
  it("bloqueia inválido", () => {
    expect(isBlockedIp("not-an-ip")).toBe(true);
    expect(isBlockedIp("999.999.999.999")).toBe(true);
  });
});

describe("isBlockedHost", () => {
  it("bloqueia localhost", () => {
    expect(isBlockedHost("localhost")).toBe(true);
    expect(isBlockedHost("foo.localhost")).toBe(true);
  });
  it("bloqueia .local e .internal", () => {
    expect(isBlockedHost("foo.local")).toBe(true);
    expect(isBlockedHost("foo.internal")).toBe(true);
  });
  it("permite host público", () => {
    expect(isBlockedHost("example.com")).toBe(false);
  });
});
