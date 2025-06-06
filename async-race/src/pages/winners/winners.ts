import BaseComponent from '../../components/base-component';
import type { HtmlTags } from '../../types/html-tags';
import './winners.scss';
import { winnersFacade } from '../../state/winners-facade';
import { CarWinner } from './car-winner';
import { carsFacade } from '../../state/cars-facade';
import { ButtonComponent } from '../../components/button-component';
import { WiNNERS_PER_PAGE } from '../../constants/app-settings';
import { WinnersSort } from '../../types/winners-sort';

export class Winners extends BaseComponent<'div'> {
  private title: BaseComponent<HtmlTags>;
  private subtitle: BaseComponent<HtmlTags>;
  private winnersContainer: BaseComponent<HtmlTags> | null = null;
  private _winners: CarWinner[] = [];
  private typeSort = WinnersSort.id;
  private readonly carsFacade = carsFacade;
  private readonly winnersFacade = winnersFacade;

  constructor() {
    super({ className: 'table' });

    this.title = new BaseComponent({
      tag: 'h2',
      parent: this,
      text: `Winners(0)`,
    });

    this.subtitle = new BaseComponent({
      tag: 'h3',
      parent: this,
      text: `Page 1`,
    });

    this.createTable();

    this.winnersFacade.setPage(this.winnersFacade.page, this.typeSort);

    if (this.winnersContainer) {
      this.renderWinners(this.winnersContainer);
    }
  }

  private renderWinners(parent: BaseComponent<HtmlTags>): void {
    this.subscribe(
      this.winnersFacade.winnerList.subscribe(async (winners) => {
        this._winners.forEach((car) => {
          car.destroyNode();
        });
        this._winners = [];
        this.title.text = `Winners(${this.winnersFacade.totalCount})`;
        this.subtitle.text = `Page ${this.winnersFacade.page}`;

        winners.forEach(async (winner, index) => {
          const winnerCarParams = await this.carsFacade.getById(winner.id);
          const carWinner = { ...winner, ...winnerCarParams };
          const winnerObj = new CarWinner(
            carWinner,
            index + (this.winnersFacade.page - 1) * WiNNERS_PER_PAGE + 1,
          );

          // this.winnersFacade.delete(winner.id);

          parent.appendChildren(winnerObj);

          this._winners.push(winnerObj);
        });
      }),
    );
  }

  private createTable(): void {
    const tableContainer = new BaseComponent({
      className: 'table-container',
      parent: this,
    });

    const tableTitleContainer = new BaseComponent({
      className: 'title-table-container',
      parent: tableContainer,
    });

    this.winnersContainer = new BaseComponent({
      className: 'winners-container',
      parent: tableContainer,
    });

    new BaseComponent({
      className: 'table-title',
      text: 'Number',
      parent: tableTitleContainer,
    });

    new BaseComponent({
      className: 'table-title',
      text: 'Car',
      parent: tableTitleContainer,
    });

    new BaseComponent({
      className: 'table-title',
      text: 'Name',
      parent: tableTitleContainer,
    });

    new ButtonComponent({
      className: 'table-title-btn',
      text: 'Wins',
      parent: tableTitleContainer,
      onClick: (): void => {
        this.typeSort = WinnersSort.wins;
        this.winnersFacade.setPage(this.winnersFacade.page, this.typeSort);
        this.winnersFacade.changeSortOrder();
      }
    });

    new ButtonComponent({
      className: 'table-title-btn',
      text: 'Best time',
      parent: tableTitleContainer,
      onClick: (): void => {
        this.typeSort = WinnersSort.time;
        this.winnersFacade.setPage(this.winnersFacade.page, this.typeSort);
        this.winnersFacade.changeSortOrder();
      }
    });

    const pageButtonsContainer = new BaseComponent({
          parent: this,
          className: 'page-btns-container',
        })

    new ButtonComponent({
      className: 'btn',
      text: 'prev',
      parent: pageButtonsContainer,
      onClick: (): Promise<void> =>
        this.winnersFacade.setPage(this.winnersFacade.page - 1, this.typeSort),
    });

    new ButtonComponent({
      className: 'btn',
      text: 'next',
      parent: pageButtonsContainer,
      onClick: (): Promise<void> =>
        this.winnersFacade.setPage(this.winnersFacade.page + 1, this.typeSort),
    });
  }
}
