export enum SvgLocalIcons {
  developer = 'developer',
  teamLeader = 'team-leader',
  projectManager = 'project-manager',
  customer = 'customer',
  shareholder = 'shareholder'
}

export const SvgIcons = {...SvgLocalIcons};
export type SvgIcons = SvgLocalIcons;

export enum TypeIcon {
  svg = 'svg'
}

class ShortIcons {
  static icons = {
    developer: SvgLocalIcons.developer + ':svg',
    teamLeader: SvgLocalIcons.teamLeader + ':svg',
    projectManager: SvgLocalIcons.projectManager + ':svg',
    customer: SvgLocalIcons.customer + ':svg',
    shareholder: SvgLocalIcons.shareholder + ':svg'
  };
}

export class LocalUI {
  static icons = {
    menu: {
      svg: {
        local: {
          developer: SvgLocalIcons.developer,
          teamLeader: SvgLocalIcons.teamLeader,
          projectManager: SvgLocalIcons.projectManager,
          customer: SvgLocalIcons.customer,
          shareholder: SvgLocalIcons.shareholder
        }
      },
      ...ShortIcons.icons
    }
  };
}
