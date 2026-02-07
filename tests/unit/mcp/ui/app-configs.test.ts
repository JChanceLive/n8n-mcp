import { describe, it, expect } from 'vitest';
import { UI_APP_CONFIGS } from '@/mcp/ui/app-configs';

describe('UI_APP_CONFIGS', () => {
  it('should have all required fields for every config', () => {
    for (const config of UI_APP_CONFIGS) {
      expect(config.id).toBeDefined();
      expect(typeof config.id).toBe('string');
      expect(config.id.length).toBeGreaterThan(0);

      expect(config.displayName).toBeDefined();
      expect(typeof config.displayName).toBe('string');
      expect(config.displayName.length).toBeGreaterThan(0);

      expect(config.description).toBeDefined();
      expect(typeof config.description).toBe('string');
      expect(config.description.length).toBeGreaterThan(0);

      expect(config.uri).toBeDefined();
      expect(typeof config.uri).toBe('string');

      expect(config.mimeType).toBeDefined();
      expect(typeof config.mimeType).toBe('string');

      expect(config.toolPatterns).toBeDefined();
      expect(Array.isArray(config.toolPatterns)).toBe(true);
    }
  });

  it('should have URIs following n8n-mcp://ui/{id} pattern', () => {
    for (const config of UI_APP_CONFIGS) {
      expect(config.uri).toBe(`n8n-mcp://ui/${config.id}`);
    }
  });

  it('should have unique IDs', () => {
    const ids = UI_APP_CONFIGS.map(c => c.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);
  });

  it('should have non-empty toolPatterns arrays', () => {
    for (const config of UI_APP_CONFIGS) {
      expect(config.toolPatterns.length).toBeGreaterThan(0);
      for (const pattern of config.toolPatterns) {
        expect(typeof pattern).toBe('string');
        expect(pattern.length).toBeGreaterThan(0);
      }
    }
  });

  it('should not have duplicate tool patterns across configs', () => {
    const allPatterns: string[] = [];
    for (const config of UI_APP_CONFIGS) {
      allPatterns.push(...config.toolPatterns);
    }
    const uniquePatterns = new Set(allPatterns);
    expect(uniquePatterns.size).toBe(allPatterns.length);
  });
});
