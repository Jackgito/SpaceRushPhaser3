// This class is used to create most of the menu text objects
export default class MenuItem {
    constructor(scene, x, y, text, onClick) {
        const hoverFontSize = '60px';
        const initialFontSize = '48px';
        this.scene = scene;
        this.text = text;
        this.onClick = onClick;
        scene.menuClick = scene.sound.add("menuClick");
        scene.menuHover = scene.sound.add("menuHover");

        // Create the menu item text
        this.menuText = this.scene.add.text(x, y, text, {
            fontFamily: "Tektur",
            fontSize: '48px',
            fill: '#ffffff',
            align: 'right'
        }).setOrigin(0.5);

        // Make the menu item interactive
        this.menuText.setInteractive();

        // Handle mouse hover
        this.menuText.on('pointerover', () => {
            this.menuText.setFontSize(hoverFontSize);
            scene.menuHover.play();
        });

        this.menuText.on('pointerout', () => {
            // Reset the font size when the mouse is no longer hovering
            this.menuText.setFontSize(initialFontSize);
        });

        // Handle mouse click
        this.menuText.on('pointerdown', () => {
            if (this.onClick) {
                scene.menuClick.play();
                onClick();
            }
        });

        // Add the menu item to the scene
        this.scene.add.existing(this.menuText);

        this.updateText = (newText) => {
            this.menuText.setText(newText);
        };
    }
}
