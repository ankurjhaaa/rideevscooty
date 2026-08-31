<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class AccessorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $accessories = [
            'THROTTLE 123/R BUTTON',
            'DC CONVERTER WIRELESS 10AMP DUAL OUTPUT',
            'ALARM KIT WITH SMART COUPER',
            'DISC PAD COMMON IMPORTED H/D',
            'MIRROR SET HERO SHINE',
            'NUT 8 NO. WITH COLOR',
            'INDICATOR BULB ORENGE SMALL',
            'TIE BELT 100MM',
            'BALL BEARING STEEL IMPORTED',
            'CALIPER BOLT (SMALL)',
            'BODY SCREW LONG',
            'BOLT BIG',
            'BODY SCREW SMALL',
            'NUT 10 NO. INCLUDEING WARSHER',
            'SIDE STAND SPRING',
            'NOSE PATTI HEAVY',
            'TAIL LIGHT HOLDER ASSY',
            'TESTING DEVICE',
            'DIGITAL MULTIMETER',
            'MCB 40A WHITE',
            'FLASHER 3-PIN RED',
            'SEAT CARRIER COMMON FLAT',
            'FOOTREST AMPERE/VESPA NEW MODEL',
            'MAIN STAND SPRING',
            'LADY FOOTREST OLA BLACK',
            'PAINT SPRAY WHITE',
            'PAINT SPRAY BLACK MATT',
            'PAINT SPRAY BLACK GLOSSY',
            'PAINT SPRAY (GRAY)',
            'TUBELESS VALVE 12MM L TYPE',
            'REFLECTOR SQUARE (RED)',
            'SHOCKER BUSH',
            'BRAKE OIL BOSCH (100ML)',
            'REAR MUDGUARD (COMMON)',
            'SWING ARM COVER ( COMMON )',
            'INNER FENDER (COMMON)',
            'FRONT MUDGUARD COMMON (BLACK 12\')',
            'FRONT MUDGUARD COMMON (WHITE12\')',
            'FOOTREST ALLUMINIUM PUSH BUTTON',
            'BRAKE SHOE 110 IMPORTED',
            'LOCK SET 27MM SMALL TANK',
            'LOCK SET 37MM SMALL TANK',
            'LOCK SET OKINAWA 47MM SMALL TANK',
            'CUP CONE SET COMMON',
            'DISC PAD PIN',
            'BODY WARSHER 8 NO.',
            'BODY WARSHER 10 NO.',
            'FOOTMATE COMMON BLACK',
            'FOOTMATE AMPERE MAGNUS TYPE BLACK',
            'SWING ARM BUSH',
            'LED 2 SIDE COMMON',
            'STAND RUBBER ROUND',
            'STAND RUBBER (SQUARE)',
            'BRAKE LEVER SET (DRUM) TYPE COMMON',
            'BRAKE LEVER SET DISC TYPE COMMON',
            'TAIL LIGHT HOLDER ASSY',
        ];

        foreach ($accessories as $accessory) {
            \App\Models\Accessory::updateOrCreate(
                ['name' => $accessory],
                [
                    'is_active' => true,
                ]
            );
        }
    }
}
