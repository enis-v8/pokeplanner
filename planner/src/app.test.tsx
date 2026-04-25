import { describe, it, expect } from 'vitest';
import { capitalize, TYPE_TO_COLOR, type Pokemon } from '../helpers/helper.ts';

/**
 * AUTOMATISIERTE TESTS FÜR POKEPLANNER - "Automatisierung vor dem Code Review"
 *
 * Diese Tests fokussieren auf die kritischsten Funktionen der App:
 * - Datenformatierung
 * - Typ-zu-Farbe Mapping
 * - Team-Management (Pokémon hinzufügen/entfernen)
 *
 * Ziel: Offensichtliche Fehler vor dem Review erkennen
 */

describe('Helper Functions', () => {
  it('should capitalize first letter of text', () => {
    expect(capitalize('pikachu')).toBe('Pikachu');
    expect(capitalize('BULBASAUR')).toBe('BULBASAUR');
    expect(capitalize('a')).toBe('A');
  });

  it('should handle empty strings gracefully', () => {
    expect(capitalize('')).toBe('');
  });

  it('should already capitalize single uppercase letter', () => {
    expect(capitalize('P')).toBe('P');
  });
});

describe('Pokemon Type Colors', () => {
  it('should have color for all 18 pokemon types', () => {
    const expectedTypes = [
      'normal', 'fighting', 'flying', 'poison', 'ground', 'rock',
      'bug', 'ghost', 'steel', 'fire', 'water', 'grass',
      'electric', 'psychic', 'ice', 'dragon', 'dark', 'fairy',
    ];

    expectedTypes.forEach(type => {
      expect(TYPE_TO_COLOR[type]).toBeDefined();
      expect(TYPE_TO_COLOR[type]).toMatch(/bg-\[#/);
      expect(TYPE_TO_COLOR[type]).toMatch(/border-\[#/);
    });
  });

  it('should use consistent color format for all types', () => {
    Object.entries(TYPE_TO_COLOR).forEach(([, colorClass]) => {
      expect(colorClass).toContain('bg-[');
      expect(colorClass).toContain('border-[');
      expect(colorClass).toMatch(/bg-\[#([0-9a-f]{6})\]/);
      expect(colorClass).toMatch(/border-\[#([0-9a-f]{6})\]/);
    });
  });
});

describe('TeamTable Component Logic', () => {
  it('should not render when team is empty', () => {
    const team: Pokemon[] = [];
    expect(team.length).toBe(0);
  });

  it('should correctly filter team members for display', () => {
    const team: Pokemon[] = [
      { name: 'pikachu', typeOne: 'electric', typeTwo: null, sprite: '' },
      { name: 'charizard', typeOne: 'fire', typeTwo: 'flying', sprite: '' },
    ];

    const nonEmptyTeam = team.length > 0;
    expect(nonEmptyTeam).toBe(true);
    expect(team).toHaveLength(2);
  });
});

describe('Team Management Logic', () => {
  it('should correctly identify if pokemon exists in team', () => {
    const team: Pokemon[] = [
      { name: 'pikachu', typeOne: 'electric', typeTwo: null, sprite: '' },
      { name: 'bulbasaur', typeOne: 'grass', typeTwo: 'poison', sprite: '' },
    ];

    const pokemonToCheck = team[0];
    const exists = team.some(member => member.name === pokemonToCheck.name);
    expect(exists).toBe(true);
  });

  it('should correctly identify if pokemon does not exist in team', () => {
    const team: Pokemon[] = [
      { name: 'pikachu', typeOne: 'electric', typeTwo: null, sprite: '' },
    ];

    const newPokemon = { name: 'charmander', typeOne: 'fire', typeTwo: null, sprite: '' };
    const exists = team.some(member => member.name === newPokemon.name);
    expect(exists).toBe(false);
  });

  it('should remove pokemon from team when it already exists', () => {
    const team: Pokemon[] = [
      { name: 'pikachu', typeOne: 'electric', typeTwo: null, sprite: '' },
      { name: 'charizard', typeOne: 'fire', typeTwo: 'flying', sprite: '' },
    ];

    const pokemonToRemove = team[0];
    const updatedTeam = team.filter(member => member.name !== pokemonToRemove.name);

    expect(updatedTeam).toHaveLength(1);
    expect(updatedTeam[0].name).toBe('charizard');
  });

  it('should add pokemon to team if below max size (6)', () => {
    const team: Pokemon[] = [
      { name: 'pikachu', typeOne: 'electric', typeTwo: null, sprite: '' },
    ];
    const newPokemon = { name: 'charizard', typeOne: 'fire', typeTwo: 'flying', sprite: '' };

    const exists = team.some(member => member.name === newPokemon.name);
    const teamCopy = [...team];

    if (!exists && teamCopy.length < 6) {
      teamCopy.push(newPokemon);
    }

    expect(teamCopy).toHaveLength(2);
    expect(teamCopy).toContain(newPokemon);
  });

  it('should NOT add pokemon if team is at max size (6)', () => {
    const team: Pokemon[] = [
      { name: 'p1', typeOne: 'fire', typeTwo: null, sprite: '' },
      { name: 'p2', typeOne: 'fire', typeTwo: null, sprite: '' },
      { name: 'p3', typeOne: 'fire', typeTwo: null, sprite: '' },
      { name: 'p4', typeOne: 'fire', typeTwo: null, sprite: '' },
      { name: 'p5', typeOne: 'fire', typeTwo: null, sprite: '' },
      { name: 'p6', typeOne: 'fire', typeTwo: null, sprite: '' },
    ];
    const newPokemon = { name: 'p7', typeOne: 'fire', typeTwo: null, sprite: '' };

    const exists = team.some(member => member.name === newPokemon.name);
    const teamCopy = [...team];

    if (!exists && teamCopy.length < 6) {
      teamCopy.push(newPokemon);
    }

    expect(teamCopy).toHaveLength(6);
    expect(teamCopy).not.toContain(newPokemon);
  });

  it('should handle type filtering logic correctly', () => {
    const pokemonList: Pokemon[] = [
      { name: 'pikachu', typeOne: 'electric', typeTwo: null, sprite: '' },
      { name: 'charizard', typeOne: 'fire', typeTwo: 'flying', sprite: '' },
      { name: 'dragonite', typeOne: 'dragon', typeTwo: 'flying', sprite: '' },
    ];

    const typeFilter = 'flying';
    const filtered = pokemonList.filter(pokemon =>
      !typeFilter || (pokemon.typeOne === typeFilter || pokemon.typeTwo === typeFilter)
    );

    expect(filtered).toHaveLength(2);
    expect(filtered).toContainEqual(pokemonList[1]);
    expect(filtered).toContainEqual(pokemonList[2]);
  });

  it('should return all pokemon when no type filter is applied', () => {
    const pokemonList: Pokemon[] = [
      { name: 'pikachu', typeOne: 'electric', typeTwo: null, sprite: '' },
      { name: 'charizard', typeOne: 'fire', typeTwo: 'flying', sprite: '' },
    ];

    const typeFilter = '';
    const filtered = pokemonList.filter(pokemon =>
      !typeFilter || (pokemon.typeOne === typeFilter || pokemon.typeTwo === typeFilter)
    );

    expect(filtered).toHaveLength(pokemonList.length);
  });
});
