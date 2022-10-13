import axios from "axios";
import { useEffect, useState } from "react";

import { DragonLairApi, RowsEntity } from "lib/types/dragonlair-api";
import ItemMobile from "./components/ItemMobile";
import ItemDesktop from "./components/ItemDesktop";

type ItemProps = {
  name: string;
  hideOutOfStock: boolean;
  isMobile?: boolean;
};

export type Product = {
  avail?: number;
  items?: Array<Items>;
  lowestHref?: string;
  lowestPrice?: number;
  name: string;
  totalSearches?: number;
  imageId?: string;
};

type Items = {
  id: string;
  name: string;
  itemsAvail: number;
  price: number;
  buyInPrice: string;
  RecentByStore: string;
  URL: string;
  imageId: string;
};

const Item = ({ name, hideOutOfStock, isMobile = false }: ItemProps) => {
  const [info, setInfo] = useState<Product>({ name });
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function getItemInfo() {
      const infoResponse = await axios.get<DragonLairApi>(
        `/api/fetch-item?name=${name.split(" ").join("+")}`
      );

      const rows =
        infoResponse.data.response.rows
          ?.filter((x: RowsEntity) =>
            x.Tags?.some((s: string) => s === "magic")
          )
          .sort(
            (a: RowsEntity, b: RowsEntity) => b.Popularity - a.Popularity
          ) ?? [];

      const avail: number = rows.reduce((acc: number, row: RowsEntity) => {
        acc += row.PrimaryAvailable;
        return acc;
      }, 0);

      const { url } = infoResponse.data.response;

      const parsedInfo: Product = {
        avail,
        lowestHref: url,
        lowestPrice: rows[0].Price,
        name: rows[0].Name,
        totalSearches: rows.length,
        imageId: rows[0].ImageId,
        items: rows.map((row: RowsEntity) => {
          return {
            id: row.Id,
            name: row.Name,
            itemsAvail: row.PrimaryAvailable,
            price: row.Price,
            buyInPrice: row.BuyinPrice,
            RecentByStore: row.RecentByStore["1"],
            URL: row.URL,
            imageId: row.ImageId,
          };
        }),
      };
      setInfo(parsedInfo);
      setLoading(false);
    }
    getItemInfo();
  }, [name]);

  if (!loading && !info.avail && hideOutOfStock) return null;

  if (isMobile) {
    return <ItemMobile product={info} />;
  }

  return <ItemDesktop nameOG={name} loading={loading} product={info} />;
};

export default Item;
