export function compressRuns(command: string) {
  const chars = command.split('');
  const groups: { ch: string; cnt: number }[] = [];
  for (const c of chars) {
    if (groups.length === 0 || groups[groups.length - 1].ch !== c) {
      groups.push({ ch: c, cnt: 1 });
    } else {
      groups[groups.length - 1].cnt++;
    }
  }
  return groups;
}

function groupsToString(groups: { ch: string; cnt: number }[]) {
  return groups.map(g => (g.cnt > 1 ? `${g.cnt}${g.ch}` : g.ch)).join('');
}

export function optimizeCommand(command: string) {
  const groups = compressRuns(command);
  const n = groups.length;
  for (let blockLen = 1; blockLen <= Math.floor(n / 2); blockLen++) {
    if (n % blockLen !== 0) continue;
    const blocksCount = n / blockLen;
    let ok = true;
    for (let i = 0; i < blockLen; i++) {
      const ref = `${groups[i].cnt}:${groups[i].ch}`;
      for (let b = 1; b < blocksCount; b++) {
        const idx = b * blockLen + i;
        if (`${groups[idx].cnt}:${groups[idx].ch}` !== ref) ok = false;
      }
      if (!ok) break;
    }
    if (ok && blocksCount > 1) {
      const block = groups.slice(0, blockLen);
      return `${blocksCount}(${groupsToString(block)})`;
    }
  }
  return groupsToString(groups);
}
