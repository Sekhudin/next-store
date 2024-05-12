import { MoreVertical } from 'lucide-react';
import { DynamicIconXS } from 'components/HOCs/icon.hoc';
import { Button } from 'packages/ui/button';
import { cn, Props } from 'packages/utils/cn';
import type { SurahVerse } from 'packages/quran-pack/quran.types';
import type { QuranSettings } from 'types/store';
import AyahOptionsPopover from 'modules/quran/components/popover/ayah-options.popover';
import helper from 'modules/quran/service/helper.service';

const MoreVerticalIcon = DynamicIconXS(MoreVertical);

const VerseNumber = ({ className, verse }: Props<{ verse: number }>) => (
  <span className={cn('relative size-10 mx-2', className)}>
    <span
      className={`absolute inset-0 bg-primary/10 dark:bg-foreground/10 border border-primary
      dark:border-foreground rounded-full`}
    />
    <span
      className={`absolute top-[50%] right-[50%] -translate-x-[-50%]
      -translate-y-[50%] text-lg text-primary dark:text-foreground`}>
      {helper.convertToArabicNumber(verse)}
    </span>
  </span>
);

const VerseContent = ({
  className,
  verse,
  value,
  settings,
}: Props<{ verse: number; value: SurahVerse; settings: QuranSettings.State }>) => {
  const versePerWords = value.arabic.split(' ');
  const isLastIndex = (index: number) => index === versePerWords.length - 1;

  return (
    <div className={cn(`flex gap-x-4 md:gap-x-6`, className)}>
      <div>
        <AyahOptionsPopover side="bottom" align="start" value={value}>
          <Button className="p-1.5 rounded-full group" variant="ghost2" size="none">
            <MoreVerticalIcon />
          </Button>
        </AyahOptionsPopover>
      </div>

      <div className="flex-grow">
        <div
          className={cn(
            `flex flex-wrap flex-row-reverse justify-start items-center gap-x-1 gap-y-4
            font-bold`
          )}
          style={{
            fontSize: `${settings.arabicFont.size}px`,
            ...settings.arabicFont.family.style,
          }}>
          {versePerWords.map((arabic, key) => {
            if (!isLastIndex(key)) {
              return (
                <span className="" key={key}>
                  {arabic}
                </span>
              );
            }

            return (
              <span className="flex" key={key}>
                <VerseNumber verse={verse} />
                {arabic}
              </span>
            );
          })}
        </div>

        <div className="flex flex-col gap-y-2 mt-8">
          <span className="block text-primary dark:text-foreground font-semibold">
            {value.latin}
          </span>
          <span className="block dark:font-extralight">{value.translation.id}</span>
        </div>
      </div>
    </div>
  );
};

export default VerseContent;
